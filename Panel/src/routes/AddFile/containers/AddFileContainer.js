import { connect } from 'react-redux'
import AddFile from '../components/AddFile'

import {
  uploadFile,
} from 'reducers/files'

const mapDispatchToProps = {
  uploadFile,
}

const mapStateToProps = (state) => ({
  files: { ...(state.files) }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddFile)
