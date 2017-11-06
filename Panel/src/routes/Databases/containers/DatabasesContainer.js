import { connect } from 'react-redux'
import Databases from '../components/Databases'
import { getDatabases, setCreateModalIsVisible } from '../../../reducers/databases'

const mapDispatchToProps = {
  getDatabases,
  setCreateModalIsVisible,
}

const mapStateToProps = (state) => ({
  auth: { ...(state.auth) },
  databases: { ...(state.databases) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Databases)
