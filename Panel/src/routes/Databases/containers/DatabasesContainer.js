import { connect } from 'react-redux'
import Databases from '../components/Databases'
import { getDatabases, setCreateModalIsVisible, deleteDatabase } from '../../../reducers/databases'

const mapDispatchToProps = {
  getDatabases,
  setCreateModalIsVisible,
  deleteDatabase,
}

const mapStateToProps = (state) => ({
  auth: { ...(state.auth) },
  databases: { ...(state.databases) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Databases)
