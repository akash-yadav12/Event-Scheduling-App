import React, { useReducer } from "react";

import PropTypes from "prop-types";

const AuthContext = React.createContext();

const initialState = {
  isLoggedIn:
    localStorage.getItem("auth") && localStorage.getItem("auth").length > 0,
  isLoading: false,
  token: localStorage.getItem("auth"),
};

export const AuthContextProvider = (props) => {
  const [authState, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const AuthReducer = (state = initialState, action) => {
  if (action.type === "LOGIN_REQUEST") {
    return {
      isLoggedIn: state.isLoggedIn,
      isLoading: true,
      token: state.token,
    };
  }
  if (action.type === "LOGIN") {
    return {
      isLoggedIn: true,
      isLoading: false,
      token: action.token,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      isLoggedIn: false,
      isLoading: false,
      token: null,
    };
  }
};

export default AuthContext;

AuthContextProvider.propTypes = {
  children: PropTypes.any,
};
