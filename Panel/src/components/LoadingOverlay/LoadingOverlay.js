import React from 'react'
import CSSModule from 'react-css-modules'
import styles from './LoadingOverlay.module.scss'

class LoadingOverlay extends React.Component {
  render () {
    return (
      <div styleName='loading-overlay-container'>
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

export default CSSModule(LoadingOverlay, styles)
