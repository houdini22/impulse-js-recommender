import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Container } from 'reactstrap'
import styles from './LoginLayout.module.scss'

class PageLayout extends React.Component {
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
