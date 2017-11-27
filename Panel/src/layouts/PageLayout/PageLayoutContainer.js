import { connect } from 'react-redux'
import PageLayout from './PageLayout'
import { logoff } from '../../reducers/auth'
import { setConnectionErrorModalVisible } from '../../reducers/common'
import { markAsRead } from '../../reducers/notifications'

const mapDispatchToProps = {
  logoff,
  setConnectionErrorModalVisible,
  markAsRead,
}

const mapStateToProps = (state) => ({
  auth: { ...(state.auth) },
  common: { ...(state.common) },
  notifications: { ...(state.notifications) },
})

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout)
