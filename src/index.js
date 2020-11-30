import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// import { Provider } from 'react-redux';
// import store from './redux-weather-app/store';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
registerServiceWorker();
