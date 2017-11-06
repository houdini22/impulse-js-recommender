import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Field } from 'redux-form'
import { Button } from 'reactstrap'
import { Select, TextField } from '../../../components'
import styles from './Form.module.scss'

export class SnapshotsView extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    databases: PropTypes.object.isRequired
  }

  render () {
    const {
      databases: { databases },
      handleSubmit
    } = this.props

    return (
      <div>
        <h6>Add connection data.</h6>
        <form onSubmit={handleSubmit}>
          <Field
            name='name'
            component={TextField}
            type='text'
            placeholder='Name'
          />
          <Field
            name='host'
            component={TextField}
            type='text'
            placeholder='Hostname'
          />
          <Field
            name='port'
            component={TextField}
            type='number'
            placeholder='Port'
            min={1}
            max={65536}
          />
          <Field
            name='username'
            component={TextField}
            type='text'
            placeholder='Username'
          />
          <Field
            name='password'
            component={TextField}
            type='password'
            placeholder='Password'
          />
          <div className='text-right'>
            <Button type='submit'>Add</Button>
          </div>
        </form>
      </div>
    )
  }
}

export default CSSModules(SnapshotsView, styles)
