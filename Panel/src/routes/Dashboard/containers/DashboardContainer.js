import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard'

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({
  auth: { ...(state.auth) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
