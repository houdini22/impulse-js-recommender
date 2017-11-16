import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import ChooseSourceFormContainer from '../containers/ChooseSourceFormContainer'
import Step1FormContainer from '../containers/Step1FormContainer'
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
          <Step4FormContainer/>
        )}
        {createModalStep === 4 && (
          <Step5FormContainer/>
        )}
      </div>
    )
  }
}

export default CSSModules(Form, styles)
