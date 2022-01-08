import Modal from '../UI/Modal'
import {useState,useContext} from 'react'
import classes from './AddEvent.module.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import EventsContext from '../../store/EventsContext'


const EventTypes = [
    {type:"Bootcamp",color:'navy'},
    {type:"Charity",color:'blue'},
    {type:"Charitable auctions",color:'green'},
    {type:"Exhibitions", color:'red'},
    {type:"Corporate", color:'cyan'},
    {type:"Family",color:'black'},
    {type:"Fundraising",color:'yellow'},
    {type:"Holiday",color:'orange'},
    {type:"Music events",color:'brown'},
    {type:"Networking events",color:'pink'},
    {type:"Product launches", color:'crimson'},
    {type:"Sports events",color:'grey'},
    {type:"Sponsored runs",color:'purple'},
    {type:"Trade shows",color:'darkblue'}
]

const checkDurValid = (st, ed) => {
	if(st[0] === ed[0]){
		return ed[1]-st[1] >= 30
	}else if(ed[0]-st[0] === 1){
		const t = (60-st[1])+(+ed[1])
		return  t >= 30
	}else{
		return true
	}
}

const AddEvent = (props) => {

	const [evtName, setEvtName] = useState('')
	const [evtType,setEvtType] = useState(EventTypes[0])
	const [startDate,setStartDate] = useState(new Date())
	const [endDate,setEndDate] = useState('')
	const [startTime, setStartTime] = useState('')
	const [endTime, setEndTime] = useState('')
	const {eventsState, dispatch} = useContext(EventsContext)

	const nameChangeHandler = e =>{
		setEvtName(e.target.value)
	}
	const selectChangeHandler = (e) => {
		const idx = EventTypes.findIndex(el => el.type === e.target.value)
		setEvtType({type: EventTypes[idx].type, color: EventTypes[idx].color})
	}

	const submitEventHandler = (e) => {
		e.preventDefault()
		const start = startDate.getFullYear() + "-" + (startDate.getMonth()+1) + "-"+startDate.getDate()
		const end = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-"+  endDate.getDate()
		if(start === end){
			if(endTime <= startTime){
				alert('please select end time greater than startTime')
				return
			}else if(!checkDurValid(startTime.split(":"),endTime.split(":"))){
				alert('Please make sure duration of the event is atleast 30 minutes')
				return
			}
		}
		const fs = new Date(start + ' '+ (startTime+":00")) 
		if(Date.parse(fs) < Date.parse(new Date())){
			alert('Please select the start time of the event as the future date')
			return
		}
		const data = {
			name:evtName,
			event_type:evtType.type,
			start:fs,
			end: new Date(end + ' '+ (endTime+":00"))
		}

		fetch('https://ik-react-task.herokuapp.com/events/',{
			method:'POST',
			headers:{
				'Authorization': `Bearer ${localStorage.getItem('auth')}`,
				'Content-Type': 'application/json'
			},
			body:JSON.stringify(data)
		})
		.then(res => res.json())
		.then(resData=> {
			if(resData.success === false){
				alert(resData.message + " please select different slot")
				return
			}else{
				alert('New Event Added Successfully')
				props.hideAddEventHandler()
				dispatch({type:'FETCH_EVENTS',events:[...eventsState.events, resData]})
			}
			}
		)
		.catch(err => console.log(err))

	}

	return <Modal onClose={props.hideAddEventHandler}>
		<div className={classes.close} onClick={props.hideAddEventHandler} title="close modal"> 𐤕 </div>
		<h1 align="center">Add New Event</h1>
		<form onSubmit={submitEventHandler} className={classes.evtForm}>
			<div className={classes.input}>
				<label>Enter Event Name</label>
				<input minLength="3" onChange={nameChangeHandler} required type="text" placeholder="enter event name"/>
			</div>
			<div className={classes.select}>
				<label>Select Event Type</label>
				<select onChange={selectChangeHandler} value={evtType.type} className={classes[evtType.color]}>
					{EventTypes.map(type => (
						<option key={type.type} className={classes[type.color]}>{type.type}</option>
					))}
				</select>
			</div>
			<div className={classes.timeslot}>
				<div>Start Date and Time</div>
				<DatePicker
					selected={startDate}
					onChange={date => setStartDate(date)}
					minDate={new Date()}
					required
		  		/>
		  		<input required type="time" placeholder="start time" onChange={e=>setStartTime(e.target.value)} value={startTime}/>
			</div>
			<div className={classes.timeslot}>
				<div>End Date and Time</div>
		  		<DatePicker
					selected={endDate}
					onChange={date => setEndDate(date)}
					minDate={startDate}
					required
		  		/>
		  		<input required type="time" placeholder="End time" onChange={e=>{console.log((new Date()).toString().substring(16,24)); setEndTime(e.target.value)}} value={endTime}/>
			</div>
	  		<button type="submit">Add Event</button>
		</form>
	</Modal>
}

export default AddEvent