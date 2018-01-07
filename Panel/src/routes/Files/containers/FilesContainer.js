import { connect } from 'react-redux'
import Files from '../components/Files'
import { loadForFilesList, removeFile, getFiles, getPagination } from 'reducers/files'

const mapDispatchToProps = {
  loadForFilesList,
  removeFile,
}

const mapStateToProps = (state) => ({
  files: getFiles(state),
  pagination: getPagination(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Files)
