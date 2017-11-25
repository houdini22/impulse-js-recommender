import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import Step1Form from '../components/Step1Form'
import { setCreateModalStep, appendNewSnapshotValues, getTables } from '../../../reducers/snapshots'

const FORM_NAME = 'index-step-1-form'

const validate = (values) => {
  const requiredFields = [
    'itemsTableName',
    'ratedByTableName',
    'ratingsTableName',
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
    itemsTableName: '',
    ratedByTableName: '',
    ratingsTableName: '',
  },
})(Step1Form)

const selector = formValueSelector(FORM_NAME)

export default connect(state => {
  const {
    itemsTableName,
    ratedByTableName,
    ratingsTableName,
  } = selector(state, 'itemsTableName', 'ratedByTableName', 'ratingsTableName')
  return {
    itemsTableName,
    ratedByTableName,
    ratingsTableName,
    snapshots: { ...state.snapshots }
  }
}, {
  getTables
})(_reduxForm)
