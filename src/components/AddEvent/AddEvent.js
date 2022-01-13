/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable sort-keys */
import React, { useState, useContext, useRef } from "react";
import DatePicker from "react-datepicker";

import PropTypes from "prop-types";

import "react-datepicker/dist/react-datepicker.css";
import EventsContext from "../../store/EventsContext";
import Modal from "../UI/Modal";
import ToastMessage from "../UI/ToastMessage";
import classes from "./AddEvent.module.css";

const EventTypes = [
  { type: "Bootcamp", color: "navy" },
  { type: "Charity", color: "blue" },
  { type: "Charitable auctions", color: "green" },
  { type: "Exhibitions", color: "red" },
  { type: "Corporate", color: "cyan" },
  { type: "Family", color: "black" },
  { type: "Fundraising", color: "yellow" },
  { type: "Holiday", color: "orange" },
  { type: "Music events", color: "brown" },
  { type: "Networking events", color: "pink" },
  { type: "Product launches", color: "crimson" },
  { type: "Sports events", color: "grey" },
  { type: "Sponsored runs", color: "purple" },
  { type: "Trade shows", color: "darkblue" },
];

const checkDurValid = (st, ed) => {
  if (st[0] === ed[0]) {
    return ed[1] - st[1] >= 30;
  } else if (ed[0] - st[0] === 1) {
    const t = 60 - st[1] + +ed[1];
    return t >= 30;
  } else {
    return true;
  }
};

const AddEvent = (props) => {
  const [evtName, setEvtName] = useState("");
  const [evtType, setEvtType] = useState(EventTypes[0]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { eventsState, dispatch } = useContext(EventsContext);
  const toastRef = useRef();

  const nameChangeHandler = (e) => {
    setEvtName(e.target.value);
  };
  const selectChangeHandler = (e) => {
    const idx = EventTypes.findIndex((el) => el.type === e.target.value);
    setEvtType({ type: EventTypes[idx].type, color: EventTypes[idx].color });
  };

  const submitEventHandler = (e) => {
    e.preventDefault();
    const start =
      startDate.getFullYear() +
      "-" +
      (startDate.getMonth() + 1) +
      "-" +
      startDate.getDate();
    const end =
      endDate.getFullYear() +
      "-" +
      (endDate.getMonth() + 1) +
      "-" +
      endDate.getDate();
    if (start === end || start > end) {
      if (endTime <= startTime || start > end) {
        toastRef.current.addToastMessage({
          message: "please select end time greater than startTime",
          type: "error",
        });
        return;
      } else if (!checkDurValid(startTime.split(":"), endTime.split(":"))) {
        toastRef.current.addToastMessage({
          message:
            "Please make sure duration of the event is atleast 30 minutes",
          type: "error",
        });
        return;
      }
    }
    const fs = new Date(start + " " + (startTime + ":00"));
    if (Date.parse(fs) < Date.parse(new Date())) {
      toastRef.current.addToastMessage({
        message: "Please select the start time of the event as the future date",
        type: "error",
      });
      return;
    }
    const data = {
      name: evtName,
      event_type: evtType.type,
      start: fs,
      end: new Date(end + " " + (endTime + ":00")),
    };
    dispatch({ type: "FETCH_EVENTS_REQUEST" });
    fetch("https://ik-react-task.herokuapp.com/events/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success === false) {
          toastRef.current.addToastMessage({
            message: resData.message + " please select different slot",
            type: "error",
          });
        } else {
          toastRef.current.addToastMessage({
            message: "New Event Added Successfully",
            type: "success",
          });
          setTimeout(() => {
            props.hideAddEventHandler();
            dispatch({
              type: "FETCH_EVENTS",
              events: [...eventsState.events, resData],
            });
          }, 2000);
        }
      })
      .catch((err) => {
        toastRef.current.addToastMessage({
          message: JSON.stringify(err),
          type: "error",
        });
      });
  };

  return (
    <>
      <ToastMessage ref={toastRef} />
      <Modal onClose={props.hideAddEventHandler}>
        <div
          className={classes.close}
          onClick={props.hideAddEventHandler}
          title="close modal"
        >
          {" "}
          X{" "}
        </div>
        <h1 align="center">Add New Event</h1>
        <form onSubmit={submitEventHandler} className={classes.evtForm}>
          <div className={classes.input}>
            <label htmlFor="event-name">Enter Event Name</label>
            <input
              minLength="3"
              id="event-name"
              onChange={nameChangeHandler}
              required
              type="text"
              placeholder="enter event name"
            />
          </div>
          <div className={classes.select}>
            <label htmlFor="event-type">Select Event Type</label>
            <select
              id="event-type"
              onChange={selectChangeHandler}
              value={evtType.type}
              className={classes[evtType.color]}
            >
              {EventTypes.map((type) => (
                <option key={type.type} className={classes[type.color]}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>
          <div className={classes.timeslot}>
            <div>Start Date and Time</div>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setEndDate("");
                setStartDate(date);
              }}
              minDate={new Date()}
              required
            />
            <input
              required
              type="time"
              placeholder="start time"
              onChange={(e) => setStartTime(e.target.value)}
              value={startTime}
            />
          </div>
          <div className={classes.timeslot}>
            <div>End Date and Time</div>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate}
              required
            />
            <input
              required
              type="time"
              placeholder="End time"
              onChange={(e) => {
                setEndTime(e.target.value);
              }}
              value={endTime}
            />
          </div>
          <button type="submit">Add Event</button>
        </form>
      </Modal>
    </>
  );
};

export default AddEvent;

AddEvent.propTypes = {
  hideAddEventHandler: PropTypes.func,
};
