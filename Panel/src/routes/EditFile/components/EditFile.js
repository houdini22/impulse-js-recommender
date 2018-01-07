import React from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import FormContainer from '../containers/Form'
import styles from './EditFile.module.scss'
import { HeaderBar } from 'layouts/PageLayout/components'
import { LoadingOverlay } from 'components/index'

class EditFile extends React.Component {
  static propTypes = {
    routeParams: PropTypes.object.isRequired,
    loadForEditFile: PropTypes.func.isRequired,
    file: PropTypes.object.isRequired,
    fileInfo: PropTypes.object.isRequired,
  }

  componentDidMount () {
    const { loadForEditFile, routeParams: { id } } = this.props
    loadForEditFile(id)
  }

  render () {
    const { file, fileInfo } = this.props
    return (
      <div>
        <HeaderBar
          title='Edit File'
          back='/app/file'
        />
        <div className='page-content'>
          {(!!file && !!fileInfo) && (
            <FormContainer
              file={file}
              fileInfo={fileInfo}
            />
          )}
          {(!file || !fileInfo) && (
            <LoadingOverlay />
          )}
        </div>
      </div>
    )
  }
}

export default CSSModules(EditFile, styles)
