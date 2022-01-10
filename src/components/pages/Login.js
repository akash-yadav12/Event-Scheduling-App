/* eslint-disable dot-notation */
/* eslint-disable sort-keys */
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/AuthContext";
import AuthForm from "../UI/AuthForm";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          alert(resData["non_field_errors"][0]);
        } else {
          localStorage.setItem("auth", resData.token);
          dispatch({ type: "LOGIN", token: resData.token });
          history.replace("/events");
        }
      })
      .catch((err) => console.log(err))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthForm
      emailChangeHandler={emailChangeHandler}
      passwordChangeHandler={passwordChangeHandler}
      submitHandler={submitHandler}
      title="Login to Continue"
      btnText="Login"
    />
  );
};

export default Login;
