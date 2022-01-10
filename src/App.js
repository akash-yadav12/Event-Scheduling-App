import React, { useState, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AddEvent from "./components/AddEvent/AddEvent";
import Events from "./components/pages/Events";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Header from "./components/UI/Header";
import AuthContext from "./store/AuthContext";

function App() {
  const { authState } = useContext(AuthContext);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const showAddEventHandler = () => {
    setShowAddEvent(true);
  };
  const hideAddEventHandler = () => {
    setShowAddEvent(false);
  };
  const PrivateRoute = (props) => {
    return authState.isLoggedIn ? (
      <Route {...props} />
    ) : (
      <Redirect to="/login" />
    );
  };
  const PublicRoute = (props) => {
    return !authState.isLoggedIn ? (
      <Route {...props} />
    ) : (
      <Redirect to="/events" />
    );
  };
  return (
    <div className="App">
      <Header showAddEventHandler={showAddEventHandler} />
      {showAddEvent && <AddEvent hideAddEventHandler={hideAddEventHandler} />}
      <Switch>
        (
        <PublicRoute path="/login">
          <Login />
        </PublicRoute>
        <PublicRoute path="/register">
          {" "}
          <Register />{" "}
        </PublicRoute>
        <PrivateRoute path="/events">
          {" "}
          <Events />
        </PrivateRoute>
        <PrivateRoute exact path="/">
          <Redirect to="/events" />
        </PrivateRoute>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
