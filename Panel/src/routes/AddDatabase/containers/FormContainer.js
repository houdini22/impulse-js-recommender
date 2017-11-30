import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import Form from '../components/Form'
import {
  createDatabase, getDatabases, testCurrentConnection, setConnectionStatus,
  updateDatabase
} from 'reducers/databases'
import { browserHistory } from 'react-router'

const FORM_NAME = 'databases-add-form'

const validate = (values) => {
  const requiredFields = [
    'name',
    'host',
    'port',
    'username',
    'password',
    'databaseName',
    'type',
  ]

  const errors = {}

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  return errors
}

const onSubmit = (values, dispatch, props) => {
  if (values.id) {
    dispatch(updateDatabase(values))
  } else {
    dispatch(createDatabase(values))
  }
  dispatch(getDatabases())
  browserHistory.push('/app/database')
}

const _reduxForm = reduxForm({
  form: FORM_NAME,
  onSubmit,
  validate,
})(Form)

const selector = formValueSelector(FORM_NAME)

export default connect(state => {
  const {
    name,
    host,
    port,
    username,
    password,
    databaseName,
    type,
  } = selector(state, 'name', 'host', 'port', 'username', 'password', 'databaseName', 'type')
  return {
    name,
    host,
    port,
    username,
    password,
    databaseName,
    type,
    databases: { ...state.databases },
  }
}, {
  testCurrentConnection,
  setConnectionStatus,
})(_reduxForm)
