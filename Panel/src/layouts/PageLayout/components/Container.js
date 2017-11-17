import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import ContainerHeader from './ContainerHeader'
import styles from './Container.module.scss'

class Container extends React.Component {
  render () {
    const { children, headerContent } = this.props

    return (
      <div styleName='app-container'>
        <ContainerHeader>
          {headerContent}
        </ContainerHeader>
        <div styleName='app-container-content'>
          {children}
        </div>
      </div>
    )
  }
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  headerContent: PropTypes.node,
}

export default CSSModules(Container, styles)