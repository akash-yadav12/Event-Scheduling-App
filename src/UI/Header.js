import {Link,NavLink} from 'react-router-dom'
import classes from './Header.module.css'
const Header = () => {
	const isAuthenticated = false
	return <header className={classes.header}>
		<nav>
			<ul>
				{!isAuthenticated && <li><NavLink activeClassName={classes.active} to="/login">Login</NavLink></li>}
				{!isAuthenticated && <li><NavLink activeClassName={classes.active} to="/register">Register</NavLink></li>}
				{isAuthenticated && <li><Link to="/events">Add New Event</Link></li>}
			</ul>
		</nav>
	</header>
}

export default Header