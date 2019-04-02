import React from 'react'
import {
  Router,
  Switch,
  Route
} from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Navigation from './components/Navigation'
import AuthRoute from './components/auth/AuthRoute'
import Error404 from './pages/Error404'
import Scraper from './pages/scraper'
import Login from './pages/auth/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Lists from './pages/lists'

const history = createBrowserHistory({
  basename: '/',
  forceRefresh: true
})

export default class App extends React.Component {
  render () {
    return (
      <Router history={history}>
        <div>
          <Navigation />

          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />

            { /* Auth routes */ }
            <AuthRoute exact path='/scraper' component={Scraper} />
            <AuthRoute exact path='/dashboard' component={Dashboard} />
            <AuthRoute exact path='/lists' component={Lists} />
            <Route component={Error404} />
          </Switch>
        </div>
      </Router>
    )
  }
}
