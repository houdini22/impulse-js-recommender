import { connect } from 'react-redux'
import AddFile from '../components/AddFile'

import {
  httpUploadFile,
} from 'reducers/files'

const mapDispatchToProps = {
  httpUploadFile,
}

export default connect(null, mapDispatchToProps)(AddFile)
