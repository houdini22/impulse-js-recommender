import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { routerReducer, syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

import './styles/main.scss'

import * as reducers from './reducers'
import { userIsAuthenticated } from './auth'

import PageLayout from './layouts/PageLayout/PageLayout'
import LoginLayout from './layouts/LoginLayout/LoginLayout'

import LoginContainer from './routes/Login'
import DashboardContainer from './routes/Dashboard'
import IndexContainer from './routes/Index'
import DatabasesContainer from './routes/Databases'

const baseHistory = browserHistory
const routingMiddleware = routerMiddleware(baseHistory)
const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
  form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunkMiddleware, routingMiddleware)
))

const history = syncHistoryWithStore(baseHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path='/app' component={PageLayout}>
          <IndexRoute component={userIsAuthenticated(DashboardContainer)}/>
          <Route path='index' component={userIsAuthenticated(IndexContainer)}/>
          <Route path='database' component={userIsAuthenticated(DatabasesContainer)}/>
        </Route>
        <Route path='/' component={LoginLayout}>
          <IndexRoute component={LoginContainer}/>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
)
