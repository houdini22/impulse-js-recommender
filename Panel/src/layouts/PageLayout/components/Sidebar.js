import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import UserIcon from 'react-icons/lib/fa/user'
import CloseIcon from 'react-icons/lib/md/close'
import { Button } from 'reactstrap'
import styles from './Sidebar.module.scss'

class Sidebar extends React.Component {
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
      <div styleName='app-sidebar'>
        {children}
        <div styleName='user-button-container'>
          <div styleName='user-button'>
            <div styleName='user-icon' onClick={() => this.toggleUserDropdown()}>
              <UserIcon/>
            </div>
            <div styleName='user-dropdown' style={{ display: userDropdownVisible ? 'block' : 'none' }}>
              <CloseIcon styleName='close-icon' onClick={() => this.toggleUserDropdown()}/>
              <div styleName='buttons'>
                <Button size='sm' color='primary'>Settings</Button>
                <Button size='sm' color='primary'>Logout</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CSSModules(Sidebar, styles)