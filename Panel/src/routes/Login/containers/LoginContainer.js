import { connect } from 'react-redux'
import Login from '../components/Login'

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({
  auth: { ...(state.auth) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
