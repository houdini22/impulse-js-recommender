import { connect } from 'react-redux'
import AddFile from '../components/EditFile'

import {
  loadEditFile,
} from 'reducers/files'

const mapDispatchToProps = {
  loadEditFile,
}

const mapStateToProps = (state) => ({
  files: { ...(state.files) }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddFile)
