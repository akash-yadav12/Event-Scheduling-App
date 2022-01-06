import './App.css';
import {useContext,useState} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Events from './components/pages/Events'
import Header from './components/UI/Header'
import NewEvent from './components/NewEvent/NewEvent'
import AuthContext from './store/AuthContext'
function App() {

  const authCtx = useContext(AuthContext)
  const [showAddEvent, setShowAddEvent] = useState(false)

  const showAddEventHandler = () => {
    setShowAddEvent(true)
  }
  const hideAddEventHandler = () => {
    setShowAddEvent(false)
  }
  return (


    <div className="App">
      <Header showAddEventHandler={showAddEventHandler}/>
      {showAddEvent && <NewEvent hideAddEventHandler={hideAddEventHandler}/>}
      <Switch>
        {!authCtx.isLoggedIn ? (<Route path="/" exact><Redirect to="/login"/></Route>) : null}
        {!authCtx.isLoggedIn && <Route path="/login"><Login /></Route>}
        {!authCtx.isLoggedIn && <Route path="/register"> <Register /> </Route>}
        {authCtx.isLoggedIn && <Route path="/events"> <Events /></Route>}
        {authCtx.isLoggedIn && <Route exact path="/" ><Redirect to="/events"/></Route>}
        <Route path="*"><Redirect to="/" /></Route>
      </Switch>
    </div>
  );
}

export default App;
