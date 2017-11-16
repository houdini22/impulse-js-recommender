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
  const errors = {}
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
    ratings_field_item_id: '',
    ratings_field_category_id: '',
    ratings_field_value: ''
  },
})(SetupFile)

const selector = formValueSelector(FORM_NAME)

export default connect(state => {
  const {
    ratings_field_item_id,
    ratings_field_category_id,
    ratings_field_value
  } = selector(state, 'ratings_field_item_id', 'ratings_field_category_id', 'ratings_field_value')
  return {
    ratings_field_item_id,
    ratings_field_category_id,
    ratings_field_value,
    snapshots: { ...state.snapshots },
    databases: { ...state.databases },
  }
}, {
  getFileInfo,
})(_reduxForm)
