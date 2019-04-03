import React from 'react'
import {
  Router,
  Switch,
  Route
} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import PropTypes from 'prop-types'

import AuthRoute from './components/auth/AuthRoute'
import Dashboard from './pages/Dashboard'
import Error404 from './pages/Error404'
import Scraper from './pages/scraper'
import Login from './pages/auth/Login'
import Home from './pages/Home'
// import Lists from './pages/lists'

const history = createBrowserHistory({
  basename: '/',
  forceRefresh: true
})

const App = (props) => {
  return (
    <Router history={history}>
      <main>
        {props.children}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />

          { /* Auth routes */ }
          <AuthRoute exact path='/scraper' component={Scraper} />
          <AuthRoute exact path='/dashboard' component={Dashboard} />
          {/* <AuthRoute exact path='/lists' component={Lists} /> */}
          <Route component={Error404} />
        </Switch>
      </main>
    </Router>
  )
}

App.propTypes = {
  children: PropTypes.object
}

export default App
