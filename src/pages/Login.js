import {useHistory} from 'react-router-dom'
import classes from './Login.module.css'
import AuthForm from '../UI/AuthForm'

const Login = () => {
	const history = useHistory()
	const submitHandler = (e) => {
		e.preventDefault()
		// history.push('/events')
	}

	return <AuthForm submitHandler={submitHandler} title="Login to Continue" btnText="Login"/>
}

export default Login