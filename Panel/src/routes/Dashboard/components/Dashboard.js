import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Dashboard.module.scss'

export class LoginView extends React.Component {
  static propTypes = {}

  render () {
    return (
      <div className='page-content'>
        Dashboard
      </div>
    )
  }
}

export default CSSModules(LoginView, styles)
