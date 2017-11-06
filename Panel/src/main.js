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

import LoginContainer from './routes/Login'
import DashboardContainer from './routes/Dashboard'
import IndexContainer from './routes/Index'

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
        <Route path='/' component={PageLayout}>
          <IndexRoute component={LoginContainer}/>
          <Route path='dashboard' component={userIsAuthenticated(DashboardContainer)}/>
          <Route path='index' component={userIsAuthenticated(IndexContainer)}/>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
)
