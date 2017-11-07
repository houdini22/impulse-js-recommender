import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Field } from 'redux-form'
import { Button } from 'reactstrap'
import { Fieldset, TextField } from '../../../components'
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
        <form onSubmit={handleSubmit}>
          <Fieldset
            title='Common'>
            <Field
              name='name'
              component={TextField}
              type='text'
              placeholder='Name'
              label='Name'
            />
          </Fieldset>
          <Fieldset
            title='Connection info'>
            <Field
              name='name'
              component={TextField}
              type='text'
              placeholder='Name'
              label='Name'
            />
            <Field
              name='host'
              component={TextField}
              type='text'
              placeholder='Hostname'
              label='Hostname'
            />
            <Field
              name='port'
              component={TextField}
              type='number'
              placeholder='Port'
              min={1}
              max={65536}
              label='Port'
            />
            <Field
              name='username'
              component={TextField}
              type='text'
              placeholder='Username'
              label='Username'
            />
            <Field
              name='password'
              component={TextField}
              type='password'
              placeholder='Password'
              label='Password'
            />
            <Field
              name='database_name'
              component={TextField}
              type='text'
              placeholder='Database Name'
              label='Database Name'
            />
          </Fieldset>
          <div className='text-right'>
            <Button type='submit' color='success'>Save</Button>
          </div>
        </form>
      </div>
    )
  }
}

export default CSSModules(SnapshotsView, styles)
