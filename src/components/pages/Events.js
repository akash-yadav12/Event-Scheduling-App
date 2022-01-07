import {useContext,useEffect} from 'react'
import classes from '../AddEvent/AddEvent.module.css'
import EventsContext from '../../store/EventsContext'

const EventTypesColors = {
    "Bootcamp":'grey',
    "Charity":'blue',
    "Charitable auctions":'green',
    "Exhibitions":'red',
    "Corporate":'cyan',
    "Family":'black',
    "Fundraising":'yellow',
    "Holiday":'orange',
    "Music events":'brown',
    "Networking events":'pink',
    "Product launches":'crimson',
    "Sports events":'white',
    "Sponsored runs":'purple',
   	"Trade shows":'darkblue'
}

const Events = () => {
	const {eventsState,dispatch} = useContext(EventsContext)

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



	return <div className={classes.wrapperEvent}>
		{eventsState.events  ? (eventsState.events.map(event => (
			<div className={`${classes.card} ${classes[EventTypesColors[event.event_type]]}`} key={event.id}>
				<h2>Event Name: {event.name.toUpperCase()}</h2>
				<h3>Event Type: {event.event_type}</h3>
				<h5>Starts on {new Date(event.start).toString().substring(0,16)} <br/>@{new Date(event.start).toString().substring(16,21)}</h5>
				<h5>Ends on {new Date(event.end).toString().substring(0,16)} <br/>@{new Date(event.end).toString().substring(16,21)}</h5>
			</div>
		))) : (<div>No Events Yet</div>)}
		</div>
}

export default Events