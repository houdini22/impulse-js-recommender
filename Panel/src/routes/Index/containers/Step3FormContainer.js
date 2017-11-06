import {reduxForm, formValueSelector} from 'redux-form'
import {connect} from 'react-redux'
import Step3Form from '../components/Step3Form'
import {setCreateModalStep, appendNewSnapshotValues} from "../../../reducers/snapshots"

const FORM_NAME = 'index-step-3-form'

const validate = (values) => {
  const requiredFields = [
    'ratings_table_name',
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
    ratings_table_name: '',
  },
})(Step3Form)

const selector = formValueSelector(FORM_NAME)

export default connect(state => {
  const ratings_table_name = selector(state, 'ratings_table_name')
  return {
    ratings_table_name,
    snapshots: { ...state.snapshots }
  }
})(_reduxForm)