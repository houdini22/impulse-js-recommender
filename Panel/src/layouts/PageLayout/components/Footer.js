import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Footer.module.scss'

class Footer extends React.Component {
  render () {
    const { children } = this.props

    return (
      <div styleName='app-footer'>
        Copyright © <strong>Impulse-ML</strong> 2017
      </div>
    )
  }
}

Footer.propTypes = {
  children: PropTypes.node,
}

export default CSSModules(Footer, styles)
