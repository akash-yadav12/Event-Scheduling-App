/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable sort-keys */
// eslint-disable jsx-a11y/click-events-have-key-events

import React, { useContext, useEffect, useState, useRef } from "react";

import FullCalendar from "@fullcalendar/react";
// eslint-disable-next-line import/order
import dayGridPlugin from "@fullcalendar/daygrid";

import EventsContext from "../../store/EventsContext";
import classes from "../AddEvent/AddEvent.module.css";
import { EventTypesColors } from "../Shared/EventTypesColors";
import Modal from "../UI/Modal";
import ToastMessage from "../UI/ToastMessage";

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

const checkEventStatus = (st, ed) => {
  const now = Date.parse(new Date());
  if (st <= now && ed > now) {
    return "Event in Progress";
  } else if (st < now && ed < now) {
    return "Event Compeleted";
  } else {
    const t = (st - now) / DAY_IN_MILLISECONDS;
    if (t < 1) {
      if (t * 24 < 1) {
        return `${Math.round(t * 24 * 60)} ${
          Math.round(t * 24 * 60) === 1 ? "Minute" : "Minutes"
        } to the Event`;
      }
      return `${Math.round(t * 24)} ${
        Math.round(t * 24) === 1 ? "Hour" : "Hours"
      } to the Event`;
    } else {
      return `${Math.round(t)} ${
        Math.round(t) === 1 ? "Day" : "Days"
      } to the Event`;
    }
  }
};

const get12HoursTime = (time) => {
  const hr = +time.substring(0, 2);
  if (hr > 12) {
    return `${hr - 12 < 9 ? "0" + (hr - 12) : hr - 12}:${time.substring(
      3,
      5
    )}PM`;
  } else {
    return time + "AM";
  }
};

const Events = () => {
  const { eventsState, dispatch } = useContext(EventsContext);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();
  useEffect(() => {
    setIsLoading(true);
    fetch("https://ik-react-task.herokuapp.com/events", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        setIsLoading(false);
        dispatch({ type: "FETCH_EVENTS", events: resData });
      })
      .catch((err) => {
        setIsLoading(false);
        toastRef.current.addToastMessage({
          message: JSON.stringify(err),
          type: "error",
        });
      });
  }, [dispatch]);

  const showCalendarHandler = (e) => {
    setShowCalendar(true);
  };

  const hideCalendarHandler = (e) => {
    setShowCalendar(false);
  };
  if (isLoading) return <p align="center">Loading....</p>;
  return (
    <>
      <ToastMessage ref={toastRef} />
      {showCalendar && (
        <Modal onClose={hideCalendarHandler}>
          <div
            className={classes.close}
            onClick={hideCalendarHandler}
            title="close modal"
          >
            {" "}
            𐤕{" "}
          </div>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={eventsState.calendarEvents}
          />
        </Modal>
      )}
      <button className={classes.calendarBtn} onClick={showCalendarHandler}>
        Show Calendar
      </button>
      <div className={classes.wrapperEvent}>
        {eventsState.events.length > 0 ? (
          eventsState.events.map((event) => (
            <div
              className={`${classes.card} ${
                classes[EventTypesColors[event.event_type]]
              } ${
                checkEventStatus(
                  Date.parse(event.start),
                  Date.parse(event.end)
                ) === "Event Compeleted"
                  ? classes.completed
                  : ""
              }`}
              key={event.id}
            >
              <h2>Event Name: {event.name.toUpperCase()}</h2>
              <p>
                This {event.event_type} will{" "}
                <strong>
                  start on {new Date(event.start).toString().substring(0, 16)} @
                  {get12HoursTime(
                    new Date(event.start).toString().substring(16, 21)
                  )}{" "}
                  and it will end on{" "}
                  {new Date(event.end).toString().substring(0, 16)} @
                  {get12HoursTime(
                    new Date(event.end).toString().substring(16, 21)
                  )}
                </strong>
              </p>
              <div className={classes.status}>
                {checkEventStatus(
                  Date.parse(event.start),
                  Date.parse(event.end)
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No Events Yet</div>
        )}
      </div>
    </>
  );
};

export default Events;
