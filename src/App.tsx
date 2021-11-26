import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import 'antd/dist/antd.css'
import './App.css';
import Login from './userLogin/login'

function App() {
  return (
    <Switch>
      <Route path='/' exact>

      </Route>
      <Route path='/login'>
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
