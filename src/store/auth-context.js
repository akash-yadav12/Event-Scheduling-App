import React, {useState} from 'react'
const AuthContext = React.createContext({
	token:'',
	isLoggedIn: false,
	login: (token) => {},
	logout: () => {}
})

export const AuthContextProvider = (props) => {

	const [token,setToken] = useState(localStorage.getItem('auth'))
	const userIsLoggedIn = !!token

	const loginHandler = (token) => {
		setToken(token)
		localStorage.setItem("auth",token)

	}

	const logoutHandler = () => {
		setToken(null)
		localStorage.removeItem("auth")
	}

	const contextValue = {
		token:token,
		isLoggedIn: userIsLoggedIn,
		login:loginHandler,
		logout: logoutHandler
	}

	return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext