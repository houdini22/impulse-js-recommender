import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import styles from './Card.module.scss'

class Card extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render () {
    const { children } = this.props

    return (
      <div styleName='card'>
        <div styleName='content'>
          {children}
        </div>
      </div>
    )
  }
}

export default CSSModule(Card, styles)
