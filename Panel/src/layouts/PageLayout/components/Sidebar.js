import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import UserIcon from 'react-icons/lib/fa/user'
import classNames from 'classnames'
import { Button } from 'reactstrap'
import { Link } from 'react-router'
import styles from './Sidebar.module.scss'

class Sidebar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userDropdownVisible: false,
      activeTab: ''
    }
    this.switchTab = this.switchTab.bind(this)
  }

  switchTab (activeTab) {
    this.setState({ activeTab })
  }

  render () {
    const { children, onClickLogout } = this.props
    const { activeTab } = this.state

    return (
      <div styleName='app-sidebar'>
        {children}
        <div className={classNames({ [styles['sidebar-tabs']]: true, [styles['is-tab-active']]: activeTab !== '' })}>
          <div styleName='tabs'>
            <ul>
              <li onClick={() => {
                if (activeTab === 'user') {
                  this.switchTab('')
                } else {
                  this.switchTab('user')
                }
              }}>
                <UserIcon/>
              </li>
            </ul>
          </div>
          <div styleName='tab-content-container'>
            {activeTab === 'user' && (
              <div>
                <div styleName='buttons-container'>
                  <Link to='/app/user/settings'>
                    <Button size='sm'>Settings</Button>
                  </Link>
                  <span>
                    <Button size='sm' onClick={onClickLogout}>Logout</Button>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  onClickLogout: PropTypes.func.isRequired
}

export default CSSModules(Sidebar, styles)
