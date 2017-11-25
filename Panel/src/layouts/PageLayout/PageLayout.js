import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import {
  Sidebar,
  SidebarHeader,
  Navigation,
  NavigationLink,
  NavigationHeader,
  Container,
} from './components'
import DatabaseIcon from 'react-icons/lib/fa/database'
import IndexIcon from 'react-icons/lib/fa/book'
import FileIcon from 'react-icons/lib/fa/file-text-o'
import ModelIcon from 'react-icons/lib/fa/sliders'
import QueueIcon from 'react-icons/lib/md/cloud-queue'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import styles from './PageLayout.module.scss'

class PageLayout extends React.Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    const { setConnectionErrorModalVisible } = this.props
    setConnectionErrorModalVisible(false)
  }

  render () {
    const { children, logoff, common } = this.props
    return (
      <div styleName='layout'>
        <Sidebar
          onClickLogout={() => {
            logoff()
          }}
        >
          <SidebarHeader
            brand='Impulse-ML'
            brandSmall='Recommender System'
          />
          <Navigation>
            <NavigationHeader caption='Data sources'/>
            <NavigationLink
              href='/app/database'
              icon={<DatabaseIcon/>}
            >
              Databases
            </NavigationLink>
            <NavigationLink
              href='/app/file'
              icon={<FileIcon/>}
            >
              Files
            </NavigationLink>
            <NavigationHeader caption='Recommender'/>
            <NavigationLink
              href='/app/index'
              icon={<IndexIcon/>}
            >
              Indexes
            </NavigationLink>
            <NavigationLink
              href='/app/model'
              icon={<ModelIcon/>}
            >
              Models
            </NavigationLink>
            <NavigationLink
              href='/app/queue'
              icon={<QueueIcon/>}
            >
              Queue
            </NavigationLink>
          </Navigation>
        </Sidebar>
        <Container>
          {children}
        </Container>
        {common.connectionErrorModalVisible && (
          <Modal isOpen={common.connectionErrorModalVisible} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Connection error</ModalHeader>
            <ModalBody>
              Connection error. Try to reload the page and try again.
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={() => {
                window.location.reload()
              }}>Reload</Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
    )
  }
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  common: PropTypes.object.isRequired,
  setConnectionErrorModalVisible: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

export default CSSModules(PageLayout, styles)

/*
<Navbar color='info' light expand='md'>
  <Container>
    <NavbarBrand tag={Link} to='/app'>Impulse</NavbarBrand>
    <NavbarToggler onClick={this.toggleNavbar}/>
    <Collapse isOpen={isNavbarOpen} navbar>
      <Nav className='ml-auto' navbar>
        <NavItem>
          <NavLink tag={Link} to='/app/database'>Databases</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to='/app/index'>Indexes</NavLink>
        </NavItem>
        <Dropdown isOpen={isDropdownOpen} toggle={this.toggleDropdown}>
          <DropdownToggle caret color='light'>
            {auth && auth.user && auth.user.username && (
              <span>{auth.user.username}</span>
            )}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => {
              logoff()
            }}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </Collapse>
  </Container>
</Navbar>
 */
