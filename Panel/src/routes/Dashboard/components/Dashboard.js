import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Dashboard.module.scss'

export class LoginView extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div>
        Dashboard
      </div>
    )
  }
}

export default CSSModules(LoginView, styles)
