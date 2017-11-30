import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import { FormGroup, Input, FormFeedback, Label } from 'reactstrap'
import styles from './Checkbox.module.scss'

class Checkbox extends React.Component {
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
      <FormGroup check color={validationState}>
        <Label check>
          <Input {...input} {...custom} type='checkbox' state={validationState} />
          {' '}
          {label}
        </Label>
        {!!error && touched && (
          <FormFeedback styleName='form-feedback'>{error}</FormFeedback>
        )}
      </FormGroup>
    )
  }
}

export default CSSModule(Checkbox, styles)
