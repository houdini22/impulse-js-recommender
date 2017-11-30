import { connect } from 'react-redux'
import Snapshots from '../components/Queue'
import {
  load,
  loadFinishedTasks,
  loadRunningTasks,
} from 'reducers/queue'

const mapDispatchToProps = {
  load,
  loadFinishedTasks,
  loadRunningTasks
}

const mapStateToProps = (state) => ({
  queue: { ...(state.queue) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Snapshots)
