import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router'
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container} from 'reactstrap'
import styles from './PageLayout.module.scss'

class PageLayout extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { children } = this.props
    const { isOpen } = this.state

    return (
      <div styleName='layout'>
        <div>
          <Navbar color="info" light expand="md">
            <Container>
              <NavbarBrand tag={Link} to='/dashboard'>Impulse</NavbarBrand>
              <NavbarToggler onClick={this.toggle}/>
              <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={Link} to='/index'>Index</NavLink>
                  </NavItem>
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
