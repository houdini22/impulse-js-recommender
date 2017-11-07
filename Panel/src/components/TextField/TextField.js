import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import { FormGroup, Input, FormFeedback, Label } from 'reactstrap'
import styles from './TextField.module.scss'

class TextField extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object
  }

  render () {
    const { input, label, meta: { touched, error }, ...custom } = this.props

    let validationState = null
    if (touched) {
      validationState = !error ? 'success' : 'danger'
    }

    return (
      <FormGroup color={validationState}>
        <Label styleName='label'><strong>{label}</strong></Label>
        <Input {...input} {...custom} autoComplete='off' state={validationState}/>
        {!!error && touched && (
          <FormFeedback styleName='form-feedback'>{error}</FormFeedback>
        )}
      </FormGroup>
    )
  }
}

export default CSSModule(TextField, styles)
