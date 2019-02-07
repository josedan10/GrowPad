import React, { Component } from 'react'
import {
  Router,
  Switch,
  Route
} from 'react-router-dom'
import { createBrowserHistory } from 'history'

import AuthRoute from './components/auth/AuthRoute'
import Error404 from './pages/Error404'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Lists from './pages/lists'
import Navigation from './components/Navigation'

const history = createBrowserHistory({
  basename: '/',
  forceRefresh: true
})

export default class App extends Component {
  render () {
    return (
      <Router history={history}>
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />

            { /* Auth routes */}
            <AuthRoute exact path='/dashboard' component={Dashboard} />
            <AuthRoute exact path='/lists' component={Lists} />
            <Route component={Error404} />
          </Switch>
        </main>
      </Router>
    )
  }
}
