import { connect } from 'react-redux'
import Snapshots from '../components/Index'
import {
  getTables,
  getRatingFields,
  createSnapshot,
  setCreateModalStep,
  getSnapshots,
  buildIndex,
  deleteIndex,
} from 'reducers/snapshots'

const mapDispatchToProps = {
  getTables,
  getRatingFields,
  createSnapshot,
  setCreateModalStep,
  getSnapshots,
  buildIndex,
  deleteIndex,
}

const mapStateToProps = (state) => ({
  auth: { ...(state.auth) },
  snapshots: { ...(state.snapshots) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Snapshots)
