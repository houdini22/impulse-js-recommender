import { connect } from 'react-redux'
import AddDatabase from '../components/AddDatabase'

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({
  databases: { ...(state.databases) }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddDatabase)
