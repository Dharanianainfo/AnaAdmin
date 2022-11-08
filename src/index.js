import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import Adminlogin from './app/admin';
import "./i18n";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter >
  <App />
  </BrowserRouter>
, document.getElementById('root'));

serviceWorker.unregister();