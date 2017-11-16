import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Field } from 'redux-form'
import { Button, Row, Col, Progress, FormGroup, Label, Input } from 'reactstrap'
import Dropzone from 'react-dropzone'
import { Select } from '../../../components/index'
import styles from './AddIndex.module.scss'

export class ChooseSourceForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    getDatabases: PropTypes.func.isRequired,
    databases: PropTypes.object.isRequired,
    uploadFile: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    setUploadedFile: PropTypes.func.isRequired,
    format: PropTypes.string.isRequired,
  }

  constructor (props) {
    super(props)
    this.onDrop = this.onDrop.bind(this)
    this.state = {
      files: null,
      progress: 0
    }
  }

  componentDidMount () {
    const { getDatabases, setUploadedFile } = this.props
    getDatabases()
    setUploadedFile(null)
  }

  onDrop (files) {
    const {
      uploadFile,
      change,
      format,
    } = this.props

    this.setState({ files })

    uploadFile(files[0], {
      format,
    }, (progressEvent) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      this.setState({
        progress
      })
    }, (uploadedFile) => {
      change('file_token', uploadedFile.token)
    })
  }

  render () {
    const {
      databases: { databases },
      handleSubmit,
      file_token,
      format,
    } = this.props
    const { files, progress } = this.state

    return (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <h6 className='text-center'>Create from remote database</h6>
            {databases && (
              <div>
                <Field
                  name='database_id'
                  component={Select}
                  type='select'
                  label='Choose database'
                  options={() => {
                    return databases.map((database) => {
                      return [database.id, database.name]
                    })
                  }}
                  disabled={file_token}
                />
              </div>
            )}
          </Col>
          <Col md={6}>
            <h6 className='text-center'>Create from local file</h6>
            <Field
              name='format'
              component={Select}
              type='select'
              label='Format'
              options={() => {
                return [
                  ['csv', 'CSV']
                ]
              }}
              disabled={files}
            />
            <div styleName='box-file'>
              {!files && format && (
                <Dropzone
                  onDrop={this.onDrop}
                  className={styles.dropzone}
                  multiple={false}
                >
                  <p>Choose file.</p>
                </Dropzone>
              )}
              {files && (
                <div>
                  <Progress
                    value={progress}
                    color='success'
                  />
                  {progress === 100 && (
                    <div style={{ marginTop: '25px' }}>
                      <FormGroup>
                        <Label>Uploaded file:</Label>
                        <Input
                          value={files[0].name}
                          disabled
                        />
                      </FormGroup>
                    </div>
                  )}
                </div>
              )}
              <Field
                name='file_token'
                component='input'
                type='hidden'
              />
            </div>
          </Col>
        </Row>
        <Row className='buttons-row'>
          <Col md={12}>
            <div className='text-right'>
              <Button type='submit'>Next</Button>
            </div>
          </Col>
        </Row>
      </form>
    )
  }
}

export default CSSModules(ChooseSourceForm, styles)
