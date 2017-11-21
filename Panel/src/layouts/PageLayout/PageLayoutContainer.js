import { connect } from 'react-redux'
import PageLayout from './PageLayout'
import { logoff } from '../../reducers/auth'
import { setConnectionErrorModalVisible } from '../../reducers/common'

const mapDispatchToProps = {
  logoff,
  setConnectionErrorModalVisible,
}

const mapStateToProps = (state) => ({
  auth: { ...(state.auth) },
  common: { ...(state.common) },
})

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout)
