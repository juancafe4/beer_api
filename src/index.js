import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './style.css'

import Layout from './components/Layout'
import Splash from './components/Splash'
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';

import store from './store'

render(
 <Provider store ={store}>
  <Router history = {browserHistory}>
    <Route path ='/' component = {Layout}>
     <IndexRoute component={Splash}/>
    </Route>
    <Route path ='/profile' component = {Profile}>
    </Route>
  </Router>
  </Provider>,
  document.getElementById('root')
);
