import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import Step4Form from '../components/Step4Form'
import { setCreateModalStep, appendNewSnapshotValues } from '../../../reducers/snapshots'

const FORM_NAME = 'index-step-4-form'

const validate = (values) => {
  const requiredFields = [
    'ratings_field_item_id',
    'ratings_field_category_id',
    'ratings_field_value',
  ]

  const errors = {}

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
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
    ratings_field_item_id: '',
    ratings_field_category_id: '',
    ratings_field_value: ''
  },
})(Step4Form)

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
    snapshots: { ...state.snapshots }
  }
})(_reduxForm)
