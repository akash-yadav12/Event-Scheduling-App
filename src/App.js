import {useState,useContext} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Events from './components/pages/Events'
import Header from './components/UI/Header'
import AddEvent from './components/AddEvent/AddEvent'
import AuthContext from './store/AuthContext'


function App() {

  const {authState} = useContext(AuthContext)
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
      {showAddEvent && <AddEvent hideAddEventHandler={hideAddEventHandler}/>}
      <Switch>
        {!authState.isLoggedIn ? (<Route path="/" exact><Redirect to="/login"/></Route>) : null}
        {!authState.isLoggedIn && <Route path="/login"><Login /></Route>}
        {!authState.isLoggedIn && <Route path="/register"> <Register /> </Route>}
        {authState.isLoggedIn && <Route path="/events"> <Events /></Route>}
        {authState.isLoggedIn && <Route exact path="/" ><Redirect to="/events"/></Route>}
        <Route path="*"><Redirect to="/" /></Route>
      </Switch>
    </div>
  );
}

export default App;
