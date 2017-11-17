import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './NavigationHeader.module.scss'

class NavigationLink extends React.Component {
  render () {
    const { caption } = this.props

    return (
      <li styleName='app-navigation-header'>
        <h3>{caption}</h3>
      </li>
    )
  }
}

NavigationLink.propTypes = {
  caption: PropTypes.node.isRequired,
}

export default CSSModules(NavigationLink, styles)
