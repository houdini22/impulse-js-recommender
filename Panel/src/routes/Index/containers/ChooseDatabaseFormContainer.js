import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import ChooseDatabaseForm from '../components/ChooseDatabaseForm'
import { setCreateModalStep, appendNewSnapshotValues, getTables } from '../../../reducers/snapshots'
import { getDatabases } from '../../../reducers/databases'

const FORM_NAME = 'index-choose-database-form'

const validate = (values) => {
  const requiredFields = [
    'database_id',
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
  dispatch(getTables(values.database_id))
}

const _reduxForm = reduxForm({
  form: FORM_NAME,
  onSubmit,
  validate,
  initialValues: {
    database_id: '',
  },
})(ChooseDatabaseForm)

const selector = formValueSelector(FORM_NAME)

export default connect(state => {
  const database_id = selector(state, 'database_id')
  return {
    database_id,
    snapshots: { ...state.snapshots },
    databases: { ...state.databases },
  }
}, {
  getDatabases
})(_reduxForm)
