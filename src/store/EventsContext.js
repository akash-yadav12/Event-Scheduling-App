import React, {useReducer} from 'react'

const EventsContext = React.createContext()

const initialState = {
	events: []
}
export const EventsContextProvider = (props) => {
	const [eventsState, dispatch] = useReducer(EventsReducer,initialState)

	return <EventsContext.Provider value={{eventsState,dispatch}}>{props.children}</EventsContext.Provider>
}


export const EventsReducer = (state=initialState, action) => {
	if(action.type === 'FETCH_EVENTS'){
		return {
			events: action.events
		}
	}
}

export default EventsContext