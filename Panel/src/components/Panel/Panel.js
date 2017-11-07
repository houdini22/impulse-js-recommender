import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import styles from './Panel.module.scss'

class TextField extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  }

  render () {
    const { title, children } = this.props

    return (
      <div styleName='panel'>
        <div styleName='title'>
          {title}
        </div>
        <div styleName='content'>
          {children}
        </div>
      </div>
    )
  }
}

export default CSSModule(TextField, styles)
