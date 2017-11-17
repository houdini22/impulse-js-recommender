import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Field } from 'redux-form'
import { Button, Row, Col, Progress, FormGroup, Label, Table } from 'reactstrap'
import Dropzone from 'react-dropzone'
import { Select, TextField, Fieldset, Checkbox } from '../../../components'
import styles from './AddFile.module.scss'

export class Form extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    uploadFile: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    setUploadedFile: PropTypes.func.isRequired,
    setUploadedFileInfo: PropTypes.func.isRequired,
    format: PropTypes.string.isRequired,
    getFileInfo: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.onDrop = this.onDrop.bind(this)
    this.state = {
      files: null,
      progress: 0,
      hasHeaderRow: false,
    }
  }

  componentDidMount () {
    const { setUploadedFile, setUploadedFileInfo } = this.props
    setUploadedFile(null)
    setUploadedFileInfo(null)
  }

  onDrop (files) {
    const {
      uploadFile,
      format,
      change,
      getFileInfo,
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
      change('name', uploadedFile.name)
      getFileInfo(uploadedFile.token)
    })
  }

  render () {
    const {
      handleSubmit,
      format,
      files: { uploadedFileInfo }
    } = this.props
    const { files, progress, hasHeaderRow } = this.state

    return (
      <form onSubmit={handleSubmit}>
        <h5>Add file</h5>
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
        {uploadedFileInfo && (
          <Fieldset title='File preview'>
            <div styleName='table-container-outer'>
              <div styleName='table-container-inner'>
                <Table styleName='table' style={{ width: `${uploadedFileInfo.firstRows[0].length * 300}px` }}>
                  <tbody>
                  {uploadedFileInfo.firstRows && uploadedFileInfo.firstRows.map((row, i) => {
                    return (
                      <tr
                        className={i === 0 && hasHeaderRow ? 'background-red shaded' : ''}
                        key={i}
                      >
                        {row.map((column, j) => {
                          return (
                            <td
                              key={j}
                            >
                              {column}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                  </tbody>
                </Table>
              </div>
            </div>
          </Fieldset>
        )}
        {progress === 100 && (
          <Fieldset title='File properties'>
            <div>
              <Field
                name='has_header_row'
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
                <Button type='submit'>Save</Button>
              </div>
            </Col>
          </Row>
        )}
      </form>
    )
  }
}

export default CSSModules(Form, styles)
