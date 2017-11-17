import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import IconArrowBack from 'react-icons/lib/md/arrow-back'
import FormContainer from '../containers/Form'
import styles from './AddFile.module.scss'
import { ContainerHeader, HeaderMenu, HeaderMenuItem } from '../../../layouts/PageLayout/components'

class Form extends React.Component {
  static propTypes = {}

  componentDidMount () {}

  render () {
    return (
      <div>
        <ContainerHeader>
          <HeaderMenu>
            <div>
              <HeaderMenuItem
                href='/app/file'
              >
                <IconArrowBack/>
                {' '}
                Back
              </HeaderMenuItem>
            </div>
          </HeaderMenu>
          <h1>Create File</h1>
        </ContainerHeader>
        <div className='page-content'>
          <FormContainer/>
        </div>
      </div>
    )
  }
}

export default CSSModules(Form, styles)
