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

	const [evtType,setEvtType] = useState(EventTypes[0])
	const [startDate,setStartDate] = useState(new Date())
	const [endDate,setEndDate] = useState('')

	const selectChangeHandler = (e) => {
		const idx = EventTypes.findIndex(el => el.type === e.target.value)
		setEvtType({type: EventTypes[idx].type, color: EventTypes[idx].color})
	}

	const submitEventHandler = (e) => {
		e.preventDefault()
	}

	return <Modal onClose={props.hideAddEventHandler}>
		<h1>Add New Event</h1>
		<form onSubmit={submitEventHandler} className={classes.evtForm}>
			<input type="text" placeholder="enter event name"/>
			<select onChange={selectChangeHandler} value={evtType.type} className={classes[evtType.color]}>
				{EventTypes.map(type => (
					<option key={type.type} className={classes[type.color]}>{type.type}</option>
				))}
			</select>
			<DatePicker
				selected={startDate}
				onChange={date => setStartDate(date)}
				minDate={new Date()}
	  		/>
	  		<DatePicker
				selected={endDate}
				onChange={date => setEndDate(date)}
				minDate={startDate}
	  		/>
	  		<button type="submit">Add Event</button>
		</form>
	</Modal>
}

export default NewEvent