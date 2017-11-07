import { connect } from 'react-redux'
import PageLayout from './PageLayout'
import { logoff } from '../../reducers/auth'

const mapDispatchToProps = {
  logoff
}

const mapStateToProps = (state) => ({
  auth: { ...(state.auth) },
})

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout)
