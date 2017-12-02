import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Form from '../components/Form'
import {
  httpUploadFile,
  setFile,
  editFile,
  loadForFilesList,
  setFileInfo,
} from 'reducers/files'

const FORM_NAME = 'index-choose-database-form'

const validate = (values) => {
  const errors = {}

  if (!values.name) {
    errors['name'] = 'Required.'
  }
  if (!values.format) {
    errors['format'] = 'Required.'
  }

  return errors
}

const onSubmit = (values, dispatch, props) => {
  const { files: { file } } = props
  dispatch(editFile(file.id, {
    name: values.name,
    hasHeaderRow: values.hasHeaderRow,
  }))
  dispatch(loadForFilesList())
  browserHistory.push('/app/file')
}

const _reduxForm = reduxForm({
  form: FORM_NAME,
  onSubmit,
  validate,
  initialValues: {
    name: '',
    format: '',
    hasHeaderRow: true,
  },
})(Form)

const selector = formValueSelector(FORM_NAME)

export default connect(state => {
  const { name, format, hasHeaderRow } = selector(state, 'name', 'format', 'hasHeaderRow')
  return {
    name,
    format,
    hasHeaderRow,
    files: { ...state.files },
  }
}, {
  httpUploadFile,
  setFile,
  setFileInfo,
})(_reduxForm)
