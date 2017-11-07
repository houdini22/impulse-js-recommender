import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap'
import styles from './LoginLayout.module.scss'

class PageLayout extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { children } = this.props

    return (
      <div styleName='layout'>
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
