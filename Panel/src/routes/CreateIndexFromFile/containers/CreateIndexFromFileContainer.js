import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import SetupFile from '../components/CreateIndexFromFile'
import {
  appendNewSnapshotValues,
  createSnapshot,
} from 'reducers/snapshots'
import {
  loadForCreateIndex,
  getFile,
  getFileInfo,
} from 'reducers/files'

const FORM_NAME = 'create-index-from-file-form'

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
    fileId,
  } = selector(state, 'itemsColumn', 'ratedByColumn', 'ratingColumn', 'name', 'fileId')
  return {
    itemsColumn,
    ratedByColumn,
    ratingColumn,
    name,
    fileId,
    initialValues: {
      name: null,
      itemsColumn: -1,
      ratedByColumn: -1,
      ratingColumn: -1,
      fileId: null,
    },
    file: getFile(state),
    fileInfo: getFileInfo(state),
  }
}, {
  loadForCreateIndex,
})(_reduxForm)
