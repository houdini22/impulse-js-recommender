import { connect } from 'react-redux'
import Files from '../components/Files'
import { loadForFilesList, removeFile } from 'reducers/files'

const mapDispatchToProps = {
  loadForFilesList,
  removeFile,
}

const mapStateToProps = (state) => ({
  files: { ...(state.files) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Files)
