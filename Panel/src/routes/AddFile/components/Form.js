import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Field } from 'redux-form'
import { Button, Row, Col, Progress, FormGroup, Label, Table } from 'reactstrap'
import Dropzone from 'react-dropzone'
import { Select, TextField, Fieldset, Checkbox, FilePreview } from 'components'
import styles from './AddFile.module.scss'

export class Form extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    httpUploadFile: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    setFile: PropTypes.func.isRequired,
    setFileInfo: PropTypes.func.isRequired,
    format: PropTypes.string.isRequired,
    fileInfo: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)
    this.onDrop = this.onDrop.bind(this)
    this.state = {
      files: null,
      progress: 0,
      hasHeaderRow: true,
    }
  }

  componentDidMount () {
    const { setFile, setFileInfo } = this.props
    setFile({})
    setFileInfo({})
  }

  onDrop (files) {
    const {
      httpUploadFile,
      format,
      change,
    } = this.props

    this.setState({ files })

    httpUploadFile(files[0], {
      format,
    }, (progressEvent) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      this.setState({
        progress
      })
    }, (uploadedFile) => {
      change('name', uploadedFile.name)
    })
  }

  render () {
    const {
      handleSubmit,
      format,
      fileInfo,
    } = this.props
    const { files, progress, hasHeaderRow } = this.state

    return (
      <form onSubmit={handleSubmit}>
        <div>
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
                    <Label>Uploaded file: <i>{files[0].name}</i></Label>
                  </FormGroup>
                </div>
              )}
            </div>
          )}
        </div>
        {(!!fileInfo && !!fileInfo.firstRows) && (
          <FilePreview
            fileInfo={fileInfo}
            highlightFirstRow={hasHeaderRow}
          />
        )}
        {progress === 100 && (
          <Fieldset title='File properties'>
            <div>
              <Field
                name='hasHeaderRow'
                component={Checkbox}
                type='checkbox'
                label='File contains header row?'
                onChange={(e, value) => {
                  this.setState({ hasHeaderRow: value })
                }}
              />
              <Field
                name='name'
                component={TextField}
                type='text'
                label='Name'
              />
            </div>
          </Fieldset>
        )}
        {progress === 100 && (
          <Row className='buttons-row'>
            <Col md={12}>
              <div className='text-right'>
                <Button type='submit' color='success'>Save</Button>
              </div>
            </Col>
          </Row>
        )}
      </form>
    )
  }
}

export default CSSModules(Form, styles)
