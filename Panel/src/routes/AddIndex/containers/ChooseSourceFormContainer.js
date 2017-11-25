import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import ChooseSourceForm from '../components/ChooseSourceForm'
import {
  setCreateModalStep,
  appendNewSnapshotValues,
  getTables,
  uploadFile,
  setUploadedFile,
} from '../../../reducers/snapshots'
import { getDatabases } from '../../../reducers/databases'
import { getFiles } from '../../../reducers/files'

const FORM_NAME = 'index-choose-database-form'

const validate = (values) => {
  const errors = {}

  if (!values.databaseId && !values.file_token) {
    errors['databaseId'] = 'Required.'
    errors['file_token'] = 'Required.'
  }

  if (values.databaseId && values.file_token) {
    errors['databaseId'] = 'Choose database or file.'
    errors['file_token'] = 'Choose database or file.'
  }

  return errors
}

const onSubmit = (values, dispatch, props) => {
  const { snapshots: { createModalStep } } = props
  dispatch(appendNewSnapshotValues(values))
  if (values.databaseId) {
    dispatch(getTables(values.databaseId))
  }
  dispatch(setCreateModalStep(createModalStep + 1))
}

const _reduxForm = reduxForm({
  form: FORM_NAME,
  onSubmit,
  validate,
  initialValues: {
    databaseId: '',
    file_token: '',
  },
})(ChooseSourceForm)

const selector = formValueSelector(FORM_NAME)

export default connect(state => {
  const { databaseId, file_token } = selector(state, 'databaseId', 'file_token')
  return {
    databaseId,
    file_token,
    snapshots: { ...state.snapshots },
    databases: { ...state.databases },
    files: { ...state.files },
  }
}, {
  getDatabases,
  uploadFile,
  setUploadedFile,
  getFiles,
})(_reduxForm)
