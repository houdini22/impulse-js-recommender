import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import Form from '../components/Form'
import { createDatabase } from '../../../reducers/databases'

const FORM_NAME = 'databases-add-form'

const validate = (values) => {
  const requiredFields = [
    'name',
    'host',
    'port',
    'username',
    'password',
    'database_name',
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
  dispatch(createDatabase(values))
}

const _reduxForm = reduxForm({
  form: FORM_NAME,
  onSubmit,
  validate,
  initialValues: {
    name: '',
    host: '',
    port: '',
    username: '',
    password: '',
    database_name: '',
  },
})(Form)

const selector = formValueSelector(FORM_NAME)

export default connect(state => {
  const {
    name,
    host,
    port,
    username,
    password,
    database_name,
  } = selector(state, 'name', 'host', 'port', 'username', 'password', 'database_name')
  return {
    name,
    host,
    port,
    username,
    password,
    database_name,
    databases: { ...state.databases }
  }
})(_reduxForm)
