import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Field } from 'redux-form'
import { Button, Row, Col, Progress, FormGroup, Label, Input } from 'reactstrap'
import Dropzone from 'react-dropzone'
import { Select } from '../../../components/index'
import styles from './AddIndex.module.scss'

export class ChooseDatabaseForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    getDatabases: PropTypes.func.isRequired,
    databases: PropTypes.object.isRequired,
    uploadFile: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    setUploadedFile: PropTypes.func.isRequired,
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
    const { uploadFile, change } = this.props
    this.setState({ files })
    uploadFile(files[0], (progressEvent) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      this.setState({
        progress
      })
      if (progress === 100) {
        change('file_uploaded', 1)
      }
    })
  }

  render () {
    const {
      databases: { databases },
      handleSubmit,
      file_uploaded,
    } = this.props
    const { files, progress } = this.state

    return (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <h6 className='text-center'>Create from database</h6>
            {databases && (
              <div>
                <Field
                  name='database_id'
                  component={Select}
                  type='select'
                  options={() => {
                    return databases.map((database) => {
                      return [database.id, database.name]
                    })
                  }}
                  disabled={file_uploaded}
                />
              </div>
            )}
          </Col>
          <Col md={6}>
            <h6 className='text-center'>Create from file</h6>
            <div styleName='box-file'>
              {!files && (
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
                name='file_uploaded'
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

export default CSSModules(ChooseDatabaseForm, styles)
