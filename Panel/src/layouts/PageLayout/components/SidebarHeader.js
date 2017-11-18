import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import styles from './SidebarHeader.module.scss'

class SidebarHeader extends React.Component {
  render () {
    const { brand, brandSmall } = this.props

    return (
      <div styleName='app-sidebar-header'>
        <h1 styleName='brand'>
          <Link to='/app'>
            {brand}
          </Link>
        </h1>
        {brandSmall && (
          <h2 styleName='brand-small'>{brandSmall}</h2>
        )}
      </div>
    )
  }
}

SidebarHeader.propTypes = {
  brand: PropTypes.string,
  brandSmall: PropTypes.string,
}

export default CSSModules(SidebarHeader, styles)
