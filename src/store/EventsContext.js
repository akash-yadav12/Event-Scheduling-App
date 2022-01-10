import React, { useReducer } from "react";

import PropTypes from "prop-types";

import { EventTypesColors } from "../components/Shared/EventTypesColors";

const EventsContext = React.createContext();

const initialState = {
  calendarEvents: [],
  events: [],
};
export const EventsContextProvider = (props) => {
  const [eventsState, dispatch] = useReducer(EventsReducer, initialState);

  return (
    <EventsContext.Provider value={{ dispatch, eventsState }}>
      {props.children}
    </EventsContext.Provider>
  );
};

export const EventsReducer = (state = initialState, action) => {
  if (action.type === "FETCH_EVENTS") {
    const clEvts = [];
    for (const el of action.events) {
      clEvts.push({
        backgroundColor: EventTypesColors[el.event_type],
        date: el.start,
        title: el.name,
      });
    }
    return {
      calendarEvents: clEvts,
      events: action.events,
    };
  }
};

export default EventsContext;

EventsContextProvider.propTypes = {
  children: PropTypes.any,
};
