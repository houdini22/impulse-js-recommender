import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { loggedIn } from '../../../reducers/auth'

const FORM_NAME = 'login-form'

const validate = (values) => {
  const requiredFields = [
    'username',
    'password'
  ]

  const errors = {}

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  return errors
}

const onSubmit = (values, dispatch) => {
  dispatch(loggedIn({ test: true })) // TODO: real login
}

const _reduxForm = reduxForm({
  form: FORM_NAME,
  onSubmit,
  validate,
  initialValues: {
    username: '',
    password: ''
  },
})(LoginForm)

const selector = formValueSelector(FORM_NAME)

export default connect(state => {
  const { username, password } = selector(state, 'user', 'password')
  return {
    username,
    password
  }
})(_reduxForm)
