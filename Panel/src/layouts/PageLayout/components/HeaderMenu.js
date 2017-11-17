import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './HeaderMenu.module.scss'

class HeaderMenu extends React.Component {
  render () {
    const { children } = this.props

    return (
      <div styleName='app-header-menu'>
        {children}
      </div>
    )
  }
}

HeaderMenu.propTypes = {
  children: PropTypes.node,
}

export default CSSModules(HeaderMenu, styles)
