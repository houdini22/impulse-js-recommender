import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'
import styles from './PageLayout.module.scss'

class PageLayout extends React.Component {
  constructor (props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)

    this.state = {
      isNavbarOpen: false,
      isDropdownOpen: false
    }
  }

  toggleNavbar () {
    this.setState({
      isNavbarOpen: !this.state.isNavbarOpen
    })
  }

  toggleDropdown () {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
    })
  }

  render () {
    const { children, auth, logoff } = this.props
    const { isNavbarOpen, isDropdownOpen } = this.state

    return (
      <div styleName='layout'>
        <div>
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
        </div>
        <div styleName='content'>
          <Container>
            {children}
          </Container>
        </div>
      </div>
    )
  }
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default CSSModules(PageLayout, styles)
