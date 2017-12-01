import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import ChooseSourceForm from '../components/ChooseSourceForm'
import {
  setCreateModalStep,
  appendNewSnapshotValues,
  getTables,
  setUploadedFile,
} from 'reducers/snapshots'
import { getDatabases } from 'reducers/databases'
import { getFiles } from 'reducers/files'

const FORM_NAME = 'index-choose-database-form'

const validate = (values) => {
  const errors = {}

  if (!values.databaseId && !values.fileId) {
    errors['databaseId'] = 'Required.'
    errors['fileId'] = 'Required.'
  }

  if (values.databaseId && values.fileId) {
    errors['databaseId'] = 'Choose database or file.'
    errors['fileId'] = 'Choose database or file.'
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
    fileId: '',
  },
})(ChooseSourceForm)

const selector = formValueSelector(FORM_NAME)

export default connect(state => {
  const { databaseId, fileId } = selector(state, 'databaseId', 'fileId')
  return {
    databaseId,
    fileId,
    snapshots: { ...state.snapshots },
    databases: { ...state.databases },
    files: { ...state.files },
  }
}, {
  getDatabases,
  setUploadedFile,
  getFiles,
})(_reduxForm)
