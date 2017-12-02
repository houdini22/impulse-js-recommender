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

import PageLayoutContainer from './layouts/PageLayout/PageLayoutContainer'
import LoginLayout from './layouts/LoginLayout/LoginLayout'

import LoginContainer from './routes/Login'
import DashboardContainer from './routes/Dashboard'
import IndexContainer from './routes/Index'
import DatabasesContainer from './routes/Databases'
import AddDatabaseContainer from './routes/AddDatabase'
import AddIndexContainer from './routes/AddIndex'
import FilesContainer from './routes/Files'
import AddFileContainer from './routes/AddFile'
import QueueContainer from './routes/Queue'
import EditFileContainer from './routes/EditFile'
import CreateIndexFromFile from './routes/CreateIndexFromFile'

const baseHistory = browserHistory
const routingMiddleware = routerMiddleware(baseHistory)
const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
  form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunkMiddleware, routingMiddleware)
))

const history = syncHistoryWithStore(baseHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path='/app' component={PageLayoutContainer}>
          <IndexRoute component={userIsAuthenticated(DashboardContainer)} />
          <Route path='index' component={userIsAuthenticated(IndexContainer)} />
          <Route path='index/add' component={userIsAuthenticated(AddIndexContainer)} />
          <Route path='index/from_file/:id' component={userIsAuthenticated(CreateIndexFromFile)} />
          <Route path='database' component={userIsAuthenticated(DatabasesContainer)} />
          <Route path='database/add' component={userIsAuthenticated(AddDatabaseContainer)} />
          <Route path='database/edit/:id' component={userIsAuthenticated(AddDatabaseContainer)} />
          <Route path='file' component={userIsAuthenticated(FilesContainer)} />
          <Route path='file/add' component={userIsAuthenticated(AddFileContainer)} />
          <Route path='file/edit/:id' component={userIsAuthenticated(EditFileContainer)} />
          <Route path='queue' component={userIsAuthenticated(QueueContainer)} />
        </Route>
        <Route path='/' component={LoginLayout}>
          <IndexRoute component={LoginContainer} />
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
)
