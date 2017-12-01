import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import SetupFile from '../components/SetupFile'
import {
  appendNewSnapshotValues,
  createSnapshot,
  getFileInfo
} from 'reducers/snapshots'

const FORM_NAME = 'setup-file-form'

const validate = (values) => {
  const requiredFields = [
    'itemsColumn',
    'ratedByColumn',
    'ratingColumn',
  ]

  const errors = {}

  requiredFields.forEach(field => {
    if (values[field] === -1) {
      errors[field] = 'Required.'
    }
  })

  if (!values.name) {
    errors['name'] = 'Required.'
  }

  return errors
}

const onSubmit = (values, dispatch, props) => {
  dispatch(appendNewSnapshotValues(values))
  dispatch(createSnapshot())
  browserHistory.push('/app/index')
}

const _reduxForm = reduxForm({
  form: FORM_NAME,
  onSubmit,
  validate
})(SetupFile)

const selector = formValueSelector(FORM_NAME)

export default connect(state => {
  const {
    itemsColumn,
    ratedByColumn,
    ratingColumn,
    name,
  } = selector(state, 'itemsColumn', 'ratedByColumn', 'ratingColumn', 'name')
  return {
    itemsColumn,
    ratedByColumn,
    ratingColumn,
    name,
    initialValues: {
      name: '',
      itemsColumn: -1,
      ratedByColumn: -1,
      ratingColumn: -1,
    },
    snapshots: { ...state.snapshots },
    databases: { ...state.databases },
  }
}, {
  getFileInfo,
})(_reduxForm)
