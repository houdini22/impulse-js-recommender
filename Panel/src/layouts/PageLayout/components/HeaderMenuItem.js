import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import styles from './HeaderMenuItem.module.scss'

class HeaderMenuItem extends React.Component {
  render () {
    const { children, href } = this.props

    return (
      <div styleName='app-header-menu-item'>
        <Link to={href}>
          <div>
            {children}
          </div>
        </Link>
      </div>
    )
  }
}

HeaderMenuItem.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
}

export default CSSModules(HeaderMenuItem, styles)
