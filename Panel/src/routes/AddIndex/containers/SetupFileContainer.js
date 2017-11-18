import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import SetupFile from '../components/SetupFile'
import {
  getFileInfo,
  appendNewSnapshotValues,
  createSnapshot,
} from '../../../reducers/snapshots'

const FORM_NAME = 'setup-file-form'

const validate = (values) => {
  const requiredFields = [
    'items_column',
    'rated_by_column',
    'rating_column',
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
    items_column,
    rated_by_column,
    rating_column,
    name,
  } = selector(state, 'items_column', 'rated_by_column', 'rating_column', 'name')
  return {
    items_column,
    rated_by_column,
    rating_column,
    name,
    initialValues: {
      name: '',
      items_column: -1,
      rated_by_column: -1,
      rating_column: -1,
    },
    snapshots: { ...state.snapshots },
    databases: { ...state.databases },
  }
}, {
  getFileInfo,
})(_reduxForm)
