import { connect } from 'react-redux'
import Form from '../components/AddIndex'

import {
  getTables,
  getRatingFields,
  createSnapshot,
  setCreateModalStep,
  getIndexes,
  buildIndex,
  deleteIndex,
} from '../../../reducers/snapshots'

const mapDispatchToProps = {
  getTables,
  getRatingFields,
  createSnapshot,
  setCreateModalStep,
  getIndexes,
  buildIndex,
  deleteIndex,
}

const mapStateToProps = (state) => ({
  auth: { ...(state.auth) },
  snapshots: { ...(state.snapshots) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
