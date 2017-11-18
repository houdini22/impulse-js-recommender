import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import UserIcon from 'react-icons/lib/fa/user'
import classNames from 'classnames'
import { Button } from 'reactstrap'
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
    const { children } = this.props
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
                  <Button size='sm'>Settings</Button>
                  <Button size='sm'>Logout</Button>
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
}

export default CSSModules(Sidebar, styles)
