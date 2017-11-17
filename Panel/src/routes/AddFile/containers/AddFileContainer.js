import { connect } from 'react-redux'
import AddFile from '../components/AddFile'

import {
  createFile,
  uploadFile,
} from '../../../reducers/files'

const mapDispatchToProps = {
  createFile,
  uploadFile,
}

const mapStateToProps = (state) => ({
  files: { ...(state.files) }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddFile)
