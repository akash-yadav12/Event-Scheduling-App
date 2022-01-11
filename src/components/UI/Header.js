import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";

import AuthContext from "../../store/AuthContext";
import EventsContext from "../../store/EventsContext";
import classes from "./Header.module.css";

const Header = (props) => {
  const { authState, dispatch } = useContext(AuthContext);
  const { eventsState } = useContext(EventsContext);

  const logoutHandler = () => {
    localStorage.removeItem("auth");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          {!authState.isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/login">
                Login
              </NavLink>
            </li>
          )}
          {!authState.isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/register">
                Register
              </NavLink>
            </li>
          )}
          {authState.isLoggedIn && (
            <li>
              <button
                onClick={props.showAddEventHandler}
                disabled={eventsState.isLoading}
              >
                Add Event
              </button>
            </li>
          )}
          {authState.isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

Header.propTypes = {
  showAddEventHandler: PropTypes.func,
};
