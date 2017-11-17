import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Container.module.scss'

class Container extends React.Component {
  render () {
    const { children } = this.props

    return (
      <div styleName='app-container'>
        {children}
      </div>
    )
  }
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CSSModules(Container, styles)