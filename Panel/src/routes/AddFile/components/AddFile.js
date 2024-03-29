import React from 'react'
import CSSModules from 'react-css-modules'
import FormContainer from '../containers/Form'
import styles from './AddFile.module.scss'
import { HeaderBar } from 'layouts/PageLayout/components'

class Form extends React.Component {
  static propTypes = {}

  componentDidMount () {}

  render () {
    return (
      <div>
        <HeaderBar
          title='Create File'
          back='/app/file'
        />
        <div className='page-content'>
          <FormContainer />
        </div>
      </div>
    )
  }
}

export default CSSModules(Form, styles)
