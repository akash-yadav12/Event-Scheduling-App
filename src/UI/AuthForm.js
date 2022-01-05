import classes from './AuthForm.module.css'
const AuthForm = props => {
	return <form onSubmit={props.submitHandler} className={classes.form}>
			<h2>{props.title}</h2>
			<div className={classes.input}>
			<label htmlFor="email">Email:</label>
			<input id="email" type="email" placeholder="enter email"/>
			</div>
			<div className={classes.input}>
			<label htmlFor="password">Password:</label>
			<input id="password" type="password" placeholder="enter password"/>
			</div>
			<button type="submit">{props.btnText}</button>
		</form>
}

export default AuthForm