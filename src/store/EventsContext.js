import React, {useReducer} from 'react'
import {EventTypesColors} from '../components/Shared/EventTypesColors'

const EventsContext = React.createContext()

const initialState = {
	events: [],
	calendarEvents:[]
}
export const EventsContextProvider = (props) => {
	const [eventsState, dispatch] = useReducer(EventsReducer,initialState)

	return <EventsContext.Provider value={{eventsState,dispatch}}>{props.children}</EventsContext.Provider>
}


export const EventsReducer = (state=initialState, action) => {
	if(action.type === 'FETCH_EVENTS'){
		const clEvts = []
		for(let el of action.events){
			clEvts.push({title:el.name,date:el.start,backgroundColor:EventTypesColors[el.event_type]})
		}
		return {
			events: action.events,
			calendarEvents:clEvts
		}
	}
}

export default EventsContext