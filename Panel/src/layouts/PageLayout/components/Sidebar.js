import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import UserIcon from 'react-icons/lib/fa/user'
import NotificationsIcon from 'react-icons/lib/md/notifications'
import QueueEndedIcon from 'react-icons/lib/fa/calendar-check-o'
import QueueRunningIcon from 'react-icons/lib/md/cloud-queue'
import ExclamationIcon from 'react-icons/lib/fa/exclamation'
import ClockIcon from 'react-icons/lib/fa/clock-o'
import classNames from 'classnames'
import { Button } from 'reactstrap'
import { Link } from 'react-router'
import { SidebarTabIcon } from './'
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
    const { children, onClickLogout, notifications: { notifications, read }, markAsRead } = this.props
    const { activeTab } = this.state

    return (
      <div styleName='app-sidebar'>
        {children}
        <div className={classNames({ [styles['sidebar-tabs']]: true, [styles['is-tab-active']]: activeTab !== '' })}>
          <div styleName='tabs'>
            <ul>
              <li
                className={classNames({ [styles['sidebar-tab-active']]: activeTab === 'user' })}
                onClick={() => {
                  if (activeTab === 'user') {
                    this.switchTab('')
                  } else {
                    this.switchTab('user')
                  }
                }}>
                <UserIcon />
              </li>
              <li
                className={classNames({ [styles['sidebar-tab-active']]: activeTab === 'notifications' })}
                onClick={() => {
                  if (activeTab === 'notifications') {
                    this.switchTab('')
                  } else {
                    this.switchTab('notifications')
                  }
                }}>
                <NotificationsIcon />
                {!read && (
                  <span styleName='tab-badge'>
                    <ExclamationIcon />
                  </span>
                )}
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
            {activeTab === 'notifications' && (
              <div>
                <div>
                  <SidebarTabIcon
                    icon={<QueueEndedIcon />}
                    iconCount={notifications.finished.value}
                    iconCountColor='success'
                  >
                    finished tasks
                  </SidebarTabIcon>
                  <SidebarTabIcon
                    icon={<QueueRunningIcon />}
                    iconCount={notifications.running.value}
                    iconCountColor='warning'
                  >
                    running tasks
                  </SidebarTabIcon>
                  <SidebarTabIcon
                    icon={<ClockIcon />}
                    iconCount={notifications.awaiting.value}
                    iconCountColor='warning'
                  >
                    awaiting tasks
                  </SidebarTabIcon>
                </div>
                <div styleName='buttons-container'>
                  <span>
                    <Button size='sm' onClick={() => markAsRead()}>Mark as read</Button>
                  </span>
                  <Link to='/app/notifications'>
                    <Button size='sm'>All</Button>
                  </Link>
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
  onClickLogout: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired,
  markAsRead: PropTypes.func.isRequired,
}

export default CSSModules(Sidebar, styles)
