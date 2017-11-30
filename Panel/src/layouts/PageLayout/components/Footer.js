import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Footer.module.scss'

class Footer extends React.Component {
  render () {
    return (
      <div styleName='app-footer'>
        Copyright © <strong>Impulse-ML</strong> 2017
      </div>
    )
  }
}

Footer.propTypes = {}

export default CSSModules(Footer, styles)
