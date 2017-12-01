import React from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import FormContainer from '../containers/Form'
import styles from './EditFile.module.scss'
import { HeaderBar } from 'layouts/PageLayout/components'

class EditFile extends React.Component {
  static propTypes = {
    routeParams: PropTypes.object.isRequired,
    loadEditFile: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired,
  }

  componentDidMount () {
    const { loadEditFile, routeParams: { id } } = this.props
    loadEditFile(id)
  }

  render () {
    const { files: { file, fileInfo } } = this.props
    return (
      <div>
        <HeaderBar
          title='Edit File'
          back='/app/file'
        />
        <div className='page-content'>
          {(file && fileInfo) && (
            <FormContainer
              file={file}
              fileInfo={fileInfo}
            />
          )}
        </div>
      </div>
    )
  }
}

export default CSSModules(EditFile, styles)
