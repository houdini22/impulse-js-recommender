import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import Step4Form from '../components/Step4Form'
import { setCreateModalStep, appendNewSnapshotValues, getRatingFields } from '../../../reducers/snapshots'

const FORM_NAME = 'index-step-4-form'

const validate = (values) => {
  const requiredFields = [
    'ratingsFieldItemId',
    'ratingsFieldCategoryId',
    'ratingsFieldValue',
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
    ratingsFieldItemId: '',
    ratingsFieldCategoryId: '',
    ratingsFieldValue: ''
  },
})(Step4Form)

const selector = formValueSelector(FORM_NAME)

export default connect(state => {
  const {
    ratingsFieldItemId,
    ratingsFieldCategoryId,
    ratingsFieldValue
  } = selector(state, 'ratingsFieldItemId', 'ratingsFieldCategoryId', 'ratingsFieldValue')
  return {
    ratingsFieldItemId,
    ratingsFieldCategoryId,
    ratingsFieldValue,
    snapshots: { ...state.snapshots }
  }
}, {
  getRatingFields
})(_reduxForm)
