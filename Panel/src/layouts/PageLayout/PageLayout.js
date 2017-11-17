import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import {
  Sidebar,
  SidebarHeader,
  Navigation,
  NavigationLink,
  Container
} from './components'
import styles from './PageLayout.module.scss'

class PageLayout extends React.Component {
  render () {
    const { children, auth, logoff } = this.props
    return (
      <div styleName='layout'>
        <Sidebar>
          <SidebarHeader
            brand='Impulse-ML'
            brandSmall='Recommender System'
          />
          <Navigation>
            <NavigationLink
              href='/app/database'
            >
              Databases
            </NavigationLink>
            <NavigationLink
              href='/app/index'
            >
              Indexes
            </NavigationLink>
          </Navigation>
        </Sidebar>
        <Container>
          {children}
        </Container>
      </div>
    )
  }
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired
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
