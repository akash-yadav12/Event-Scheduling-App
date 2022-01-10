import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthContextProvider } from "./store/AuthContext";
import { EventsContextProvider } from "./store/EventsContext";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <EventsContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </EventsContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
