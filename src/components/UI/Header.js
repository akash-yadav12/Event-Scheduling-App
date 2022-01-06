import {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import classes from './Header.module.css'
import AuthContext from '../../store/AuthContext'
const Header = props => {

	const authCtx = useContext(AuthContext)

	const logoutHandler = () => {
		authCtx.logout()
	}

	return <header className={classes.header}>
		<nav>
			<ul>
				{!authCtx.isLoggedIn && <li><NavLink activeClassName={classes.active} to="/login">Login</NavLink></li>}
				{!authCtx.isLoggedIn && <li><NavLink activeClassName={classes.active} to="/register">Register</NavLink></li>}
				{authCtx.isLoggedIn && <li><button onClick={props.showAddEventHandler}>New Event</button></li>}
				{authCtx.isLoggedIn && <li><button onClick={logoutHandler}>Logout</button></li>}
			</ul>
		</nav>
	</header>
}

export default Header