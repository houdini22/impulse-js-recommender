import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import IconArrowBack from 'react-icons/lib/md/arrow-back'
import ChooseSourceFormContainer from '../containers/ChooseSourceFormContainer'
import Step1FormContainer from '../containers/Step1FormContainer'
import Step4FormContainer from '../containers/Step4FormContainer'
import Step5FormContainer from '../containers/Step5FormContainer'
import SetupFileContainer from '../containers/SetupFileContainer'
import { ContainerHeader, HeaderMenu, HeaderMenuItem } from '../../../layouts/PageLayout/components'
import styles from './AddIndex.module.scss'

class Form extends React.Component {
  static propTypes = {
    snapshots: PropTypes.object.isRequired,
    setCreateModalStep: PropTypes.func.isRequired,
  }

  componentDidMount () {
    const { setCreateModalStep } = this.props
    setCreateModalStep(1)
  }

  render () {
    const {
      snapshots: { createModalStep, uploadedFile },
    } = this.props

    return (
      <div>
        <ContainerHeader>
          <HeaderMenu>
            <div>
              <HeaderMenuItem
                href='/app/index'
              >
                <IconArrowBack/>
                {' '}
                Back
              </HeaderMenuItem>
            </div>
          </HeaderMenu>
          <h1>Create Index</h1>
        </ContainerHeader>
        <div className='page-content'>
          {createModalStep === 1 && (
            <ChooseSourceFormContainer/>
          )}
          {createModalStep === 2 && !uploadedFile && (
            <Step1FormContainer/>
          )}
          {createModalStep === 2 && uploadedFile && (
            <SetupFileContainer/>
          )}
          {createModalStep === 3 && !uploadedFile && (
            <Step4FormContainer/>
          )}
          {createModalStep === 4 && (
            <Step5FormContainer/>
          )}
        </div>
      </div>
    )
  }
}

export default CSSModules(Form, styles)
