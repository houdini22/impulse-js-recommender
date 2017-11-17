import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import FormContainer from '../containers/Form'
import styles from './AddFile.module.scss'

class Form extends React.Component {
  static propTypes = {}

  componentDidMount () {}

  render () {
    return (
      <div className='page-content'>
        <FormContainer/>
      </div>
    )
  }
}

export default CSSModules(Form, styles)
