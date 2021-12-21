import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css'
import './App.css';
import Login from './userLogin/login'
import PageIndex from './page/PageIndex';

function App() {
  return (
    <Switch>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/' exact>
        <Redirect from='/' to='/login' />
      </Route>
      <Route path='/mytestplatform' exact>
        <Redirect from='/' to='/login' />
      </Route>
      <Route path='/index'>
        <PageIndex />
      </Route>
    </Switch>
  );
}

export default App;
