import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Badge } from 'reactstrap'
import classNames from 'classnames'
import styles from './SidebarTabIcon.module.scss'

class IconBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hover: false
    }
  }

  render () {
    const { icon, iconCount, iconCountColor, children } = this.props
    const { hover } = this.state

    return (
      <div
        className={classNames({ [styles['icon-box']]: true, [styles['icon-box-hover']]: hover })}
        id='icon-box'
        onMouseEnter={() => {
          this.setState({ hover: true })
        }}
        onMouseLeave={() => {
          this.setState({ hover: false })
        }}
      >
        <div styleName='icon-box-icon'>
          {icon}
          {typeof iconCount !== 'undefined' && (
            <Badge color={iconCountColor} styleName='icon-badge' size='sm'>{iconCount}</Badge>
          )}
        </div>
        <div styleName='icon-box-caption'>
          {children}
        </div>
      </div>
    )
  }
}

IconBox.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node.isRequired,
  iconCount: PropTypes.number,
  iconCountColor: PropTypes.string,
}

export default CSSModules(IconBox, styles)
