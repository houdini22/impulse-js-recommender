import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Sidebar.module.scss'

class Sidebar extends React.Component {
  render () {
    const { children } = this.props

    return (
      <div styleName='app-sidebar'>
        {children}
      </div>
    )
  }
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CSSModules(Sidebar, styles)