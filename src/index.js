import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/js/bootstrap.bundle";
import "./index.css";
import App from "./App";
import axios from 'axios'

axios.defaults.baseURL = 'https://ips-backend-staging.finqalab.com/v1/'

axios.defaults.headers =
{
  'x-auth-token': localStorage.getItem('token'),
  'Content-Type': 'application/json'
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

