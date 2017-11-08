import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import { Field } from 'redux-form'
import { Button, Alert } from 'reactstrap'
import { Fieldset, TextField, Select, StateButton } from '../../../components'
import styles from './Form.module.scss'
import { setConnectionStatus, testCurrentConnection } from '../../../reducers/databases'

export class SnapshotsView extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    databases: PropTypes.object.isRequired,
    change: PropTypes.func.isRequired,
    setConnectionStatus: PropTypes.func.isRequired,
    testCurrentConnection: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.values = {
      host: '',
      type: '',
      database_name: '',
      port: '',
    }
  }

  componentDidMount () {
    const { setConnectionStatus, dispatch } = this.props
    dispatch(setConnectionStatus({
      status: 0,
      message: ''
    }))
  }

  fillName () {
    const { host, type, database_name, port } = this.values
    this.props.change('name', `[${type}] ${host}:${port}@${database_name}`)
  }

  render () {
    const {
      databases: { connectionStatus: { status, message } },
      handleSubmit,
      dispatch,
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
                dispatch(setConnectionStatus({
                  status: 0,
                  message: ''
                }))
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
                dispatch(setConnectionStatus({
                  status: 0,
                  message: ''
                }))
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
                dispatch(setConnectionStatus({
                  status: 0,
                  message: ''
                }))
              }}
            />
            <Field
              name='username'
              component={TextField}
              type='text'
              placeholder='Username'
              label='Username'
              onChange={() => {
                dispatch(setConnectionStatus({
                  status: 0,
                  message: ''
                }))
              }}
            />
            <Field
              name='password'
              component={TextField}
              type='password'
              placeholder='Password'
              label='Password'
              onChange={() => {
                dispatch(setConnectionStatus({
                  status: 0,
                  message: ''
                }))
              }}
            />
            <Field
              name='database_name'
              component={TextField}
              type='text'
              placeholder='Database Name'
              label='Database Name'
              onChange={(event, value) => {
                this.values.database_name = value
                this.fillName()
                dispatch(setConnectionStatus({
                  status: 0,
                  message: ''
                }))
              }}
            />
            <div className='text-right form-actions'>
              <StateButton
                color={status === 0 ? 'primary' : status === -1 ? 'danger' : 'success'}
                onClick={() => {
                  if (status === 0) {
                    dispatch(testCurrentConnection({
                      type: this.props.type,
                      host: this.props.host,
                      port: this.props.port,
                      username: this.props.username,
                      password: this.props.password,
                      database_name: this.props.database_name
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
            <div style={{ marginTop: '16px' }}>
              {status === -1 && (
                <Alert color='danger'>
                  <div className='text-center'>
                    {message}
                  </div>
                </Alert>
              )}
            </div>
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

export default CSSModules(SnapshotsView, styles)
