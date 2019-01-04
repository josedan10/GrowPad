import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Error404 from './pages/Error404';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>

          <Link to="/register">Register</Link>
          <Link to="/">Home</Link>
          <Link to="/Somewhere">404</Link>

          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path='/dashboard' component={Dashboard}/>            
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route component={Error404}/>            
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
