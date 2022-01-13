/* eslint-disable dot-notation */
/* eslint-disable sort-keys */
import React, { useState, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/AuthContext";
import AuthForm from "../UI/AuthForm";
import ToastMessage from "../UI/ToastMessage";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toastRef = useRef();
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const data = { email, password };
    fetch("https://ik-react-task.herokuapp.com/accounts/login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData["non_field_errors"]) {
          toastRef.current.addToastMessage({
            message: resData["non_field_errors"][0],
            type: "error",
          });
        } else if (resData.password) {
          toastRef.current.addToastMessage({
            message: resData.password[0],
            type: "error",
          });
        } else {
          localStorage.setItem("auth", resData.token);
          dispatch({ type: "LOGIN", token: resData.token });
          history.replace("/events");
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
      <AuthForm
        emailChangeHandler={emailChangeHandler}
        passwordChangeHandler={passwordChangeHandler}
        submitHandler={submitHandler}
        title="Login to Continue"
        btnText="Login"
      />
    </>
  );
};

export default Login;
