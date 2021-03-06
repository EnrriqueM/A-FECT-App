import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

/* index.js first place file to load.
* Therefore, it is good place to set any defaults
* axios.default - object that set ups defualts for all request that are being sent
* bsaeUrl - other paths will be append to this base URL
* can also set other defaults such as headers
*/
//axios.defaults.baseURL = 'http://localhost:8080';
//http://ec2-3-15-41-69.us-east-2.compute.amazonaws.com:8080
axios.defaults.baseURL = 'http://ec2-3-15-41-69.us-east-2.compute.amazonaws.com:8080';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
