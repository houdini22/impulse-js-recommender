import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import { LoadingOverlay } from '../'
import styles from './PageHeader.module.scss'

class PageHeader extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isLoading: PropTypes.any,
  }

  render () {
    const { children, isLoading } = this.props

    return (
      <h3 styleName='page-header'>
        <span styleName='page-header-caption'>
          {children}
        </span>
        {(isLoading) && (
          <span styleName='page-header-loading-container'>
            <LoadingOverlay
              size='xs'
              noBackground
            />
          </span>
        )}
      </h3>
    )
  }
}

export default CSSModule(PageHeader, styles)
