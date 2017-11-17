import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import styles from './NavigationLink.module.scss'

class NavigationLink extends React.Component {
  render () {
    const { children, href } = this.props

    return (
      <li styleName='app-navigation-link'>
        <Link to={href}>
          {children}
        </Link>
      </li>
    )
  }
}

NavigationLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
}

export default CSSModules(NavigationLink, styles)
