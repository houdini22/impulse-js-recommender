import { connect } from 'react-redux'
import Files from '../components/Files'
import { getFiles, deleteFile } from 'reducers/files'

const mapDispatchToProps = {
  getFiles,
  deleteFile,
}

const mapStateToProps = (state) => ({
  files: { ...(state.files) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Files)
