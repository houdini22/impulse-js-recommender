import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import _ from 'underscore'
import { FormGroup, Input, FormFeedback, Label } from 'reactstrap'
import styles from './Select.module.scss'

class Select extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  }

  render () {
    const { input, label, meta: { touched, error }, options, ...custom } = this.props

    let validationState = null
    if (touched) {
      validationState = !error ? 'success' : 'danger'
    }

    let _options = options
    if (_.isFunction(options)) {
      _options = options()
    }

    return (
      <FormGroup color={validationState}>
        {label && (
          <Label>{label}</Label>
        )}
        <Input {...input} {...custom} autoComplete='off' state={validationState}>
          <option value=''>--- choose ---</option>
          {_options.map((value) => {
            let _value = value
            let _label = value
            if (_.isArray(value)) {
              _value = value[0]
              _label = value[1]
            }
            return <option key={_value} value={_value}>{_label}</option>
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
