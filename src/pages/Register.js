import AuthForm from '../UI/AuthForm'
import classes from './Login.module.css'
import {useHistory} from 'react-router-dom'
const Register = () => {
	const history = useHistory()

	const submitHandler = (e) => {

		e.preventDefault()
		const data = {email:"akashrsy123@gmail.com",password:"akashrsy"}
		fetch('https://ik-react-task.herokuapp.com/accounts/register/', {
			method:"POST",
			headers:{
				'Accept': 'application/json',
				'Content-Type':'application/json'
			},
			body:JSON.stringify(data)
		}).then(res => res.json())
			.then(resData => {
				if(resData.success){
					alert('User Registered Successfully!!')
				}else{
					alert(resData.errors)
				}
				history.push('/login')
			})
			.catch(err=>console.log(err))
		.catch(err => {
			console.log(err)
		})
	}

	return <AuthForm btnText="Register" title="Register a new account" submitHandler={submitHandler}/>
}

export default Register