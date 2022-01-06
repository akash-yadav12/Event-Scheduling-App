import Modal from '../UI/Modal'
import {useState} from 'react'
import classes from './AddEvent.module.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


const EventTypes = [
    {type:"Bootcamp",color:'grey'},
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
    {type:"Sports events",color:'white'},
    {type:"Sponsored runs",color:'purple'},
    {type:"Trade shows",color:'darkblue'}
]
const NewEvent = (props) => {

	const [evtName, setEvtName] = useState('')
	const [evtType,setEvtType] = useState(EventTypes[0])
	const [startDate,setStartDate] = useState(new Date())
	const [endDate,setEndDate] = useState('')
	const [startTime, setStartTime] = useState('')
	const [endTime, setEndTime] = useState('')

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
			}
		}
		const data = {
			name:evtName,
			event_type:evtType.type,
			start:new Date(start + ' '+ (startTime+":00")),
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
				console.log(resData)
				alert(resData.message + " please select different slot")
				return
			}else{
				alert('New Event Added Successfully')
				props.hideAddEventHandler()
				console.log(resData)}
			}
		)
		.catch(err => console.log(err))

	}

	return <Modal onClose={props.hideAddEventHandler}>
		<h1>Add New Event</h1>
		<form onSubmit={submitEventHandler} className={classes.evtForm}>
			<input onChange={nameChangeHandler} required type="text" placeholder="enter event name"/>
			<select onChange={selectChangeHandler} value={evtType.type} className={classes[evtType.color]}>
				{EventTypes.map(type => (
					<option key={type.type} className={classes[type.color]}>{type.type}</option>
				))}
			</select>
			<div>
			<DatePicker
				selected={startDate}
				onChange={date => setStartDate(date)}
				minDate={new Date()}
				required
	  		/>
	  		<input required type="time" placeholder="start time" onChange={e=>setStartTime(e.target.value)} value={startTime}/>
			</div>
			<div>
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

export default NewEvent