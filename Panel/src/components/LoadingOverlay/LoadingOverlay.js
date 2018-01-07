import React from 'react'
import CSSModule from 'react-css-modules'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import styles from './LoadingOverlay.module.scss'

class LoadingOverlay extends React.Component {
  render () {
    const { size, noBackground } = this.props

    return (
      <div styleName='loading-overlay-container' className={classNames({
        [styles['size-xs']]: size === 'xs',
        [styles['no-background']]: noBackground === true,
      })}
      >
        <div className={styles['sk-folding-cube']}>
          <div className={`${styles['sk-cube1']} ${styles['sk-cube']}`}/>
          <div className={`${styles['sk-cube2']} ${styles['sk-cube']}`}/>
          <div className={`${styles['sk-cube4']} ${styles['sk-cube']}`}/>
          <div className={`${styles['sk-cube3']} ${styles['sk-cube']}`}/>
        </div>
      </div>
    )
  }
}

LoadingOverlay.propTypes = {
  size: PropTypes.string,
  noBackground: PropTypes.bool,
}

export default CSSModule(LoadingOverlay, styles)
