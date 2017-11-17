import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './HeaderMenuItem.module.scss'

class HeaderMenuItem extends React.Component {
  render () {
    const { children } = this.props

    return (
      <li styleName='app-header-menu-item'>
        {children}
      </li>
    )
  }
}

HeaderMenuItem.propTypes = {
  children: PropTypes.node,
}

export default CSSModules(HeaderMenuItem, styles)
