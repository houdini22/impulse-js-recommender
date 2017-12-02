import { connect } from 'react-redux'
import AddFile from '../components/EditFile'

import {
  loadForEditFile,
} from 'reducers/files'

const mapDispatchToProps = {
  loadForEditFile,
}

const mapStateToProps = (state) => ({
  files: { ...(state.files) }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddFile)
