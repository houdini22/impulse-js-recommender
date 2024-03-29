import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import { Field } from 'redux-form'
import { Button, Alert } from 'reactstrap'
import { Fieldset, TextField, Select, StateButton } from 'components'
import styles from './Form.module.scss'
import { testCurrentConnection } from 'reducers/databases'

export class Form extends React.Component {
  constructor (props) {
    super(props)
    this.values = {
      host: '',
      type: '',
      databaseName: '',
      port: '',
    }
  }

  componentDidMount () {
    this.resetStatus()
  }

  componentWillReceiveProps (nextProps) {
    const { database, change } = nextProps
    if (Object.keys(this.props.database).length === 0 && !!database) {
      Object.keys(database).forEach((key) => {
        change(key, database[key])
        this.values[key] = database[key]
      })
    }
  }

  fillName () {
    const { change } = this.props
    const { host, databaseName, port } = this.values
    change('name', `${host}:${port}@${databaseName}`)
  }

  resetStatus () {
    const {
      setConnectionStatus
    } = this.props
    setConnectionStatus({
      status: 0,
      message: ''
    })
  }

  render () {
    const {
      databases: { connectionStatus: { status, message } },
      handleSubmit,
      dispatch,
      type, host, port, username, password, databaseName,
    } = this.props

    const testDisabled = (!type || !host || !port || !username || !password || !databaseName)

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
                this.resetStatus()
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
                this.resetStatus()
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
                this.resetStatus()
              }}
            />
            <Field
              name='username'
              component={TextField}
              type='text'
              placeholder='Username'
              label='Username'
              onChange={() => {
                this.resetStatus()
              }}
            />
            <Field
              name='password'
              component={TextField}
              type='password'
              placeholder='Password'
              label='Password'
              onChange={() => {
                this.resetStatus()
              }}
            />
            <Field
              name='databaseName'
              component={TextField}
              type='text'
              placeholder='Database Name'
              label='Database Name'
              onChange={(event, value) => {
                this.values.databaseName = value
                this.fillName()
                this.resetStatus()
              }}
            />
            <div className='text-right form-actions'>
              <StateButton
                color={status === 0 ? 'primary' : status === -1 ? 'danger' : 'success'}
                disabled={testDisabled}
                onClick={() => {
                  if (status === 0) {
                    dispatch(testCurrentConnection({
                      type: this.props.type,
                      host: this.props.host,
                      port: this.props.port,
                      username: this.props.username,
                      password: this.props.password,
                      databaseName: this.props.databaseName
                    }))
                  }
                }}
              >
                {status === 0 && (
                  <span>Test connection</span>
                )}
                {status === -1 && (
                  <span>Connection error</span>
                )}
                {status === 1 && (
                  <span>Connection OK</span>
                )}
              </StateButton>
            </div>
            {status === -1 && (
              <div style={{ marginTop: '16px' }}>
                <Alert color='danger'>
                  <div className='text-center'>
                    {message}
                  </div>
                </Alert>
              </div>
            )}
          </Fieldset>
          <Fieldset
            title='Common'>
            <Field
              name='name'
              component={TextField}
              type='text'
              placeholder='Name'
              label='Name'
              readOnly
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

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  databases: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  setConnectionStatus: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  database: PropTypes.object,
  type: PropTypes.string,
  host: PropTypes.string,
  port: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  databaseName: PropTypes.string,
}

export default CSSModules(Form, styles)
