import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Form from '../components/Form'
import {
  editFile,
  getFile,
} from 'reducers/files'

const FORM_NAME = 'edit-file-form'

const validate = (values) => {
  const errors = {}

  if (!values.name) {
    errors['name'] = 'Required.'
  }

  return errors
}

const onSubmit = (values, dispatch) => {
  dispatch(editFile(values.id, {
    name: values.name,
    hasHeaderRow: values.hasHeaderRow
  }))
  browserHistory.push('/app/file')
}

const _reduxForm = reduxForm({
  form: FORM_NAME,
  onSubmit,
  validate,
  enableReinitialize: true
})(Form)

export default connect(
  state => {
    const file = getFile(state)
    return {
      initialValues: {
        id: file.id,
        name: file.name,
        hasHeaderRow: file.hasHeaderRow,
      }
    }
  },
)(_reduxForm)
