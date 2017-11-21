import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Alert } from 'reactstrap'
import LoginFormContainer from '../containers/LoginFormContainer'
import styles from './Login.module.scss'

export class LoginView extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  }

  componentWillReceiveProps (nextProps) {
    const { auth: { isLoggedIn } } = nextProps
    if (isLoggedIn) {
      this.props.router.push('/app')
    }
  }

  render () {
    const { auth: { loginError } } = this.props

    return (
      <div styleName='login-container-outer'>
        <div styleName='login-container-inner'>
          {loginError && (
            <Alert color='danger' styleName='error-message'>
              Wrong credentials!
            </Alert>
          )}
          <LoginFormContainer/>
        </div>
      </div>
    )
  }
}

export default CSSModules(LoginView, styles)
