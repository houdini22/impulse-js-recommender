import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import UserIcon from 'react-icons/lib/fa/user'
import { Button } from 'reactstrap'
import styles from './ContainerHeader.module.scss'

class ContainerHeader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userDropdownVisible: false
    }
    this.toggleUserDropdown = this.toggleUserDropdown.bind(this)
  }

  toggleUserDropdown () {
    this.setState({
      userDropdownVisible: !this.state.userDropdownVisible
    })
  }

  render () {
    const { children } = this.props
    const { userDropdownVisible } = this.state

    return (
      <div styleName='app-container-header'>
        {children}
        <div styleName='user-button'>
          <div styleName='user-icon' onClick={() => this.toggleUserDropdown()}>
            <UserIcon/>
          </div>
          <div styleName='user-dropdown' style={{ display: userDropdownVisible ? 'block' : 'none' }}>
            <div styleName='buttons'>
              <Button size='sm'>Settings</Button>
              <Button size='sm'>Logout</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ContainerHeader.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CSSModules(ContainerHeader, styles)