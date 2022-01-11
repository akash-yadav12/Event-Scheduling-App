import React from "react";

import PropTypes from "prop-types";

import ToastMessage from "../UI/ToastMessage";
import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  return (
    <>
      {props.showToast ? <ToastMessage message={props.toastContent} /> : null}
      <form onSubmit={props.submitHandler} className={classes.form}>
        <h2>{props.title}</h2>
        <div className={classes.input}>
          <label htmlFor="email">Email:</label>
          <input
            onChange={props.emailChangeHandler}
            id="email"
            type="email"
            placeholder="enter email"
          />
        </div>
        <div className={classes.input}>
          <label htmlFor="password">Password:</label>
          <input
            minLength="4"
            onChange={props.passwordChangeHandler}
            id="password"
            type="password"
            placeholder="enter password"
          />
        </div>
        <button type="submit">{props.btnText}</button>
      </form>
    </>
  );
};

export default AuthForm;

AuthForm.propTypes = {
  btnText: PropTypes.string,
  emailChangeHandler: PropTypes.func,
  passwordChangeHandler: PropTypes.func,
  showToast: PropTypes.bool,
  submitHandler: PropTypes.func,
  title: PropTypes.string,
  toastContent: PropTypes.string,
};
