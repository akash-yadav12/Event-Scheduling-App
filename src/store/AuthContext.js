import React, {useReducer} from 'react'
const AuthContext = React.createContext()

const initialState = {
  token:localStorage.getItem('auth'),
  isLoggedIn: localStorage.getItem('auth') && localStorage.getItem('auth').length > 0
}

export const AuthContextProvider = (props) => {

	const [authState,dispatch] = useReducer(AuthReducer,initialState)

	return <AuthContext.Provider value={{authState,dispatch}}>{props.children}</AuthContext.Provider>
}


export const AuthReducer = (state=initialState,action) => {
	if(action.type === 'LOGIN'){
		return {
			token:action.token,
			isLoggedIn: true
		}
	}
	if(action.type === 'LOGOUT'){
		return {
			token:null,
			isLoggedIn: false
		}
	}
}

export default AuthContext