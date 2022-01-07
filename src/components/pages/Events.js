import {useContext,useEffect,useState} from 'react'
import classes from '../AddEvent/AddEvent.module.css'
import EventsContext from '../../store/EventsContext'
import Modal from '../UI/Modal'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 
import {EventTypesColors} from '../Shared/EventTypesColors'

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24

const checkEventStatus = (st, ed) => {
	const now = Date.parse(new Date())
	if(st <= now && ed > now){
		return "Event in Progress"
	}else if(st<now && ed < now){
		return "Event Compeleted"
	}else{
		const t = (st-now)/DAY_IN_MILLISECONDS
		if(t< 1){
			return `Around ${Math.round(t*24)} ${Math.round(t*24) == 1 ? 'Hour' :'Hours'} to the Event`
		}else{
			return `${Math.round(t)} ${Math.round(t) == 1 ? 'Day':'Days'} to the Event`
		}
	}

}

const Events = () => {
	const {eventsState,dispatch} = useContext(EventsContext)
	const [showCalendar, setShowCalendar] = useState(false)
	useEffect(() => {
		fetch('https://ik-react-task.herokuapp.com/events', {
			method:'GET',
			headers:{
				'Authorization': `Bearer ${localStorage.getItem('auth')}`,
				'Content-Type': 'application/json'
			}			
		}).then(res => res.json()).then(resData => {
			dispatch({type:'FETCH_EVENTS',events:resData})
		})
		.catch(err => console.log(err))
	},[dispatch])


	const showCalendarHandler = (e) => {
		setShowCalendar(true)
	}

	const hideCalendarHandler = (e) => {
		setShowCalendar(false)
	}
	return <>
		{showCalendar && (<Modal onClose={hideCalendarHandler}>
		<div className={classes.close} onClick={hideCalendarHandler} title="close modal"> 𐤕 </div>
		<FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={eventsState.calendarEvents}
      />
      </Modal>)}
      <button className={classes.calendarBtn} onClick={showCalendarHandler}>Show Calendar</button>
		<div className={classes.wrapperEvent}>
		{eventsState.events  ? (eventsState.events.map(event => (
			<div className={`${classes.card} ${classes[EventTypesColors[event.event_type]]}`} key={event.id}>
				<h2>Event Name: {event.name.toUpperCase()}</h2>
				<p>This {event.event_type} will <strong>start on {new Date(event.start).toString().substring(0,16)} @{new Date(event.start).toString().substring(16,21)} and it will end on {new Date(event.end).toString().substring(0,16)} @{new Date(event.end).toString().substring(16,21)}</strong>
				</p>
				<div className={classes.status}>{checkEventStatus(Date.parse(event.start), Date.parse(event.end))}</div>
			</div>
		))) : (<div>No Events Yet</div>)}
		</div>
		</>
}

export default Events