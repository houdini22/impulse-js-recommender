import {connect} from 'react-redux'
import Snapshots from '../components/Index'
import {
  getTables,
  getRatingFields,
  createSnapshot,
  setCreateModalIsVisible,
  setCreateModalStep,
  getIndexes,
  buildIndex,
} from "../../../reducers/snapshots";

const mapDispatchToProps = {
  getTables,
  getRatingFields,
  createSnapshot,
  setCreateModalIsVisible,
  setCreateModalStep,
  getIndexes,
  buildIndex
}

const mapStateToProps = (state) => ({
  auth: { ...(state.auth) },
  snapshots: { ...(state.snapshots) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Snapshots)
