import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css'
import './App.css';
import Login from './userLogin/login'

function App() {
  return (
    <Switch>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/' exact>
        <Redirect from='/' to='/login' />
      </Route>
    </Switch>
  );
}

export default App;
