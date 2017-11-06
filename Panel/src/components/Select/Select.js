import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import { FormGroup, Input, FormFeedback, Label } from 'reactstrap'
import styles from './Select.module.scss'

class Select extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
  }

  render () {
    const { input, label, meta: { touched, error }, children, options, ...custom } = this.props

    let validationState = null
    if (touched) {
      validationState = !error ? 'success' : 'danger'
    }

    return (
      <FormGroup color={validationState}>
        <Label>{label}</Label>
        <Input {...input} {...custom} autoComplete='off' state={validationState}>
          <option value=''>--- choose ---</option>
          {options.map((value) => {
            return <option key={value} value={value}>{value}</option>
          })}
        </Input>
        {!!error && touched && (
          <FormFeedback>{error}</FormFeedback>
        )}
      </FormGroup>
    )
  }
}

export default CSSModule(Select, styles)
