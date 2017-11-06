import {reduxForm, formValueSelector} from 'redux-form'
import {connect} from 'react-redux'
import Step5Form from '../components/Step5Form'
import {appendNewSnapshotValues, createSnapshot} from "../../../reducers/snapshots";

const FORM_NAME = 'index-step-5-form'

const validate = (values) => {
  const requiredFields = [
    'name',
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
  dispatch(appendNewSnapshotValues(values));
  dispatch(createSnapshot())
}

const _reduxForm = reduxForm({
  form: FORM_NAME,
  onSubmit,
  validate,
  initialValues: {
    name: '',
  },
})(Step5Form)

const selector = formValueSelector(FORM_NAME)

export default connect(state => {
  const name = selector(state, 'name')
  return {
    name,
    snapshots: { ...state.snapshots }
  }
})(_reduxForm)
