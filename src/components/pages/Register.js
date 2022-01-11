/* eslint-disable sort-keys */
import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import AuthForm from "../UI/AuthForm";
import ToastMessage from "../UI/ToastMessage";

const Register = () => {
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
    fetch("https://ik-react-task.herokuapp.com/accounts/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.errors) {
          toastRef.current.addToastMessage({
            message: resData.errors,
            type: "error",
          });
        } else if (resData.email) {
          toastRef.current.addToastMessage({
            message: resData.email[0],
            type: "error",
          });
        } else {
          toastRef.current.addToastMessage({
            message: resData.message + " Redirecting to the login page",
            type: "success",
          });
          setTimeout(() => {
            history.replace("/login");
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
      <AuthForm
        emailChangeHandler={emailChangeHandler}
        passwordChangeHandler={passwordChangeHandler}
        btnText="Register"
        title="Register a new account"
        submitHandler={submitHandler}
      />
    </>
  );
};

export default Register;
