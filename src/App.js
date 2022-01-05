import './App.css';
import {Route,Switch} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Events from './pages/Events'
import Header from './UI/Header'
import NewEvent from './components/NewEvent'
function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/events">
          <Events />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
