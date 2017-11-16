import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import SetupFile from '../components/SetupFile'
import {
  getFileInfo,
  appendNewSnapshotValues,
  setCreateModalStep,
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

  return errors
}

const onSubmit = (values, dispatch, props) => {
  const { snapshots: { createModalStep } } = props
  dispatch(appendNewSnapshotValues(values))
  dispatch(setCreateModalStep(createModalStep + 1))
}

const _reduxForm = reduxForm({
  form: FORM_NAME,
  onSubmit,
  validate,
  initialValues: {
    items_column: -1,
    rated_by_column: -1,
    rating_column: -1
  },
})(SetupFile)

const selector = formValueSelector(FORM_NAME)

export default connect(state => {
  const {
    items_column,
    rated_by_column,
    rating_column
  } = selector(state, 'items_column', 'rated_by_column', 'rating_column')
  return {
    items_column,
    rated_by_column,
    rating_column,
    snapshots: { ...state.snapshots },
    databases: { ...state.databases },
  }
}, {
  getFileInfo,
})(_reduxForm)
