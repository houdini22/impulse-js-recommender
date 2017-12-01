import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import { LoadingOverlay } from '../'
import styles from './IconBox.module.scss'

class IconBox extends React.Component {
  static propTypes = {
    icon: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    isLoading: PropTypes.bool,
  }

  render () {
    const { icon, children, isLoading, } = this.props

    return (
      <div styleName='icon-box'>
        <div styleName='icon-box-icon'>
          {icon}
        </div>
        <div styleName='icon-box-content'>
          {children}
        </div>
        {isLoading && (
          <LoadingOverlay/>
        )}
      </div>
    )
  }
}

export default CSSModule(IconBox, styles)
