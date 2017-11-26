import { connect } from 'react-redux'
import Snapshots from '../components/Index'
import {
  getQueue
} from '../../../reducers/queue'

const mapDispatchToProps = {
  getQueue,
}

const mapStateToProps = (state) => ({
  queue: { ...(state.queue) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Snapshots)
