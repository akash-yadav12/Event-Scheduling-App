import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {AuthContextProvider} from './store/AuthContext'
import {EventsContextProvider} from './store/EventsContext'
ReactDOM.render(
  <React.StrictMode>
    <EventsContextProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </AuthContextProvider>
      </EventsContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
