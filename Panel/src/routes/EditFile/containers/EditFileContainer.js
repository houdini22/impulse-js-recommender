import { connect } from 'react-redux'
import AddFile from '../components/EditFile'

import {
  loadForEditFile,
  getFile,
  getFileInfo,
} from 'reducers/files'

const mapDispatchToProps = {
  loadForEditFile,
}

const mapStateToProps = (state) => ({
  file: getFile(state),
  fileInfo: getFileInfo(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddFile)
