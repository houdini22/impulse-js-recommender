import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import ChooseDatabaseForm from '../components/ChooseSourceForm'
import {
  setCreateModalStep,
  appendNewSnapshotValues,
  getTables,
  uploadFile,
  setUploadedFile,
} from '../../../reducers/snapshots'
import { getDatabases } from '../../../reducers/databases'

const FORM_NAME = 'index-choose-database-form'

const validate = (values) => {
  const errors = {}

  if (values.file_id) {
    if (!values.format) {
      errors['format'] = 'Required.'
    }
  } else {
    if (!values.database_id) {
      errors['database_id'] = 'Required.'
    }
  }

  return errors
}

const onSubmit = (values, dispatch, props) => {
  const { snapshots: { createModalStep } } = props
  dispatch(appendNewSnapshotValues(values))
  dispatch(setCreateModalStep(createModalStep + 1))
  dispatch(getTables(values.database_id))
}

const _reduxForm = reduxForm({
  form: FORM_NAME,
  onSubmit,
  validate,
  initialValues: {
    database_id: '',
    file_id: 0,
    format: '',
  },
})(ChooseDatabaseForm)

const selector = formValueSelector(FORM_NAME)

export default connect(state => {
  const { database_id, file_id, format } = selector(state, 'database_id', 'file_id', 'format')
  return {
    database_id,
    file_id,
    format,
    snapshots: { ...state.snapshots },
    databases: { ...state.databases },
  }
}, {
  getDatabases,
  uploadFile,
  setUploadedFile,
})(_reduxForm)
