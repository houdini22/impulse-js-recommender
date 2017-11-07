import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import { Field } from 'redux-form'
import { Button } from 'reactstrap'
import { Fieldset, TextField, Select } from '../../../components'
import styles from './Form.module.scss'

export class SnapshotsView extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    databases: PropTypes.object.isRequired,
    change: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.values = {
      type: '',
      host: '',
      databaseName: '',
      port: '',
    }
  }

  fillName () {
    const { host, type, databaseName, port } = this.values
    this.props.change('name', `[${type}] ${host}:${port}@${databaseName}`)
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
            title='Database Type'>
            <Field
              name='type'
              component={Select}
              type='select'
              placeholder='Database Type'
              label='Database Type'
              options={[
                ['mysql', 'MySQL']
              ]}
              onChange={(event, value) => {
                this.values.type = value
                this.fillName()
              }}
            />
          </Fieldset>
          <Fieldset
            title='Connection info'>
            <Field
              name='host'
              component={TextField}
              type='text'
              placeholder='Hostname'
              label='Hostname'
              onChange={(event, value) => {
                this.values.host = value
                this.fillName()
              }}
            />
            <Field
              name='port'
              component={TextField}
              type='number'
              placeholder='Port'
              min={1}
              max={65536}
              label='Port'
              onChange={(event, value) => {
                this.values.port = value
                this.fillName()
              }}
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
              onChange={(event, value) => {
                this.values.databaseName = value
                this.fillName()
              }}
            />
          </Fieldset>
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
          <div className='text-right form-actions'>
            <Link to='/app/database'>
              <Button>Cancel</Button>
            </Link>
            <Button type='submit' color='success'>Save</Button>
          </div>
        </form>
      </div>
    )
  }
}

export default CSSModules(SnapshotsView, styles)
