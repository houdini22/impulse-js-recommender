import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './ContainerHeader.module.scss'

class ContainerHeader extends React.Component {
  render () {
    const { children } = this.props

    return (
      <div styleName='app-container-header'>
        {children}
      </div>
    )
  }
}

ContainerHeader.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CSSModules(ContainerHeader, styles)
