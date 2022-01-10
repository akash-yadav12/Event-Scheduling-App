/* eslint-disable sort-keys */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import AuthForm from "../UI/AuthForm";

const Register = () => {
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
    fetch("https://ik-react-task.herokuapp.com/accounts/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData, "what is");
        if (resData.errors) {
          alert(resData.errors);
        } else {
          alert(resData.message);
        }

        history.replace("/login");
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
      btnText="Register"
      title="Register a new account"
      submitHandler={submitHandler}
    />
  );
};

export default Register;
