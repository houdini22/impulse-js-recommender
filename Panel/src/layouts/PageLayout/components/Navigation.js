import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Navigation.module.scss'

class Navigation extends React.Component {
  render () {
    const { children } = this.props

    return (
      <div styleName='app-navigation'>
        <h3 styleName='app-navigation-header'>Navigation</h3>
        <ul styleName='app-navigation-links'>
          {children}
        </ul>
      </div>
    )
  }
}

Navigation.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CSSModules(Navigation, styles)
