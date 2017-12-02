import { connect } from 'react-redux'
import AddFile from '../components/AddFile'

import {
  httpUploadFile,
} from 'reducers/files'

const mapDispatchToProps = {
  httpUploadFile,
}

const mapStateToProps = (state) => ({
  files: { ...(state.files) }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddFile)
