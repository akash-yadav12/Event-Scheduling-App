import './App.css';
import {useContext} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Events from './pages/Events'
import Header from './UI/Header'
import NewEvent from './components/NewEvent'
import AuthContext from './store/auth-context'
function App() {

  const authCtx = useContext(AuthContext)
  return (
    <div className="App">
      <Header/>
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
