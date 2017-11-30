import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import { Button } from 'reactstrap'
import classnames from 'classnames'
import styles from './StateButton.module.scss'

class StateButton extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    color: PropTypes.string,
  }

  render () {
    const { children, isLoading, onClick, size, color, disabled } = this.props
    const classes = classnames({ [styles.isLoading]: isLoading, [styles.button]: true })
    const isDisabled = isLoading || disabled

    return (
      <Button
        className={classes}
        onClick={onClick}
        disabled={isDisabled}
        size={size}
        color={color}
      >
        <span>{children}</span>
        {isLoading && (
          <div className={styles['sk-folding-cube']}>
            <div className={`${styles['sk-cube1']} ${styles['sk-cube']}`} />
            <div className={`${styles['sk-cube2']} ${styles['sk-cube']}`} />
            <div className={`${styles['sk-cube4']} ${styles['sk-cube']}`} />
            <div className={`${styles['sk-cube3']} ${styles['sk-cube']}`} />
          </div>
        )}
      </Button>
    )
  }
}

export default CSSModule(StateButton, styles)
