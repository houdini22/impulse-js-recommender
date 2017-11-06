import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Alert } from 'reactstrap'
import LoginFormContainer from '../containers/LoginFormContainer'
import { LoadingOverlay } from '../../../components'
import styles from './Login.module.scss'

export class LoginView extends React.Component {
  static propTypes = {}

  componentWillReceiveProps (nextProps) {
    const { auth: { isLoggedIn } } = nextProps
    if (isLoggedIn) {
      this.props.router.push('/dashboard')
    }
  }

  render () {
    const { loginFailed } = this.props

    return (
      <div styleName='login-container-outer'>
        <div styleName='login-container-inner'>
          <LoginFormContainer/>
          {loginFailed && (
            <Alert color='danger' styleName='error-message'>
              Wrong credentials!
            </Alert>
          )}
        </div>
      </div>
    )
  }
}

export default CSSModules(LoginView, styles)
