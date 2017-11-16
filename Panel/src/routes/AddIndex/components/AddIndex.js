import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import ChooseSourceFormContainer from '../containers/ChooseSourceFormContainer'
import Step1FormContainer from '../containers/Step1FormContainer'
import Step2FormContainer from '../containers/Step2FormContainer'
import Step3FormContainer from '../containers/Step3FormContainer'
import Step4FormContainer from '../containers/Step4FormContainer'
import Step5FormContainer from '../containers/Step5FormContainer'
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
      snapshots: { createModalStep },
    } = this.props

    return (
      <div>
        {createModalStep === 1 && (
          <ChooseSourceFormContainer/>
        )}
        {createModalStep === 2 && (
          <Step1FormContainer/>
        )}
        {createModalStep === 3 && (
          <Step2FormContainer/>
        )}
        {createModalStep === 4 && (
          <Step3FormContainer/>
        )}
        {createModalStep === 5 && (
          <Step4FormContainer/>
        )}
        {createModalStep === 6 && (
          <Step5FormContainer/>
        )}
      </div>
    )
  }
}

export default CSSModules(Form, styles)
