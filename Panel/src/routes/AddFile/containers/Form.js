import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Form from '../components/Form'
import {
  uploadFile,
  setUploadedFile,
  updateFile,
  getFiles,
  getFileInfo,
  setUploadedFileInfo,
} from '../../../reducers/files'

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
  const { files: { uploadedFile } } = props
  dispatch(updateFile({
    token: uploadedFile.token,
    name: values.name,
    has_header_row: values.has_header_row,
  }))
  dispatch(getFiles())
  browserHistory.push('/app/file')
}

const _reduxForm = reduxForm({
  form: FORM_NAME,
  onSubmit,
  validate,
  initialValues: {
    name: '',
    format: '',
    has_header_row: 0
  },
})(Form)

const selector = formValueSelector(FORM_NAME)

export default connect(state => {
  const { name, format, has_header_row } = selector(state, 'name', 'format', 'has_header_row')
  return {
    name,
    format,
    has_header_row,
    files: { ...state.files },
  }
}, {
  uploadFile,
  setUploadedFile,
  getFileInfo,
  setUploadedFileInfo,
})(_reduxForm)