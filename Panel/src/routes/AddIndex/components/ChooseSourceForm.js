import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Field } from 'redux-form'
import { Button, Row, Col, Progress, FormGroup, Label, Input } from 'reactstrap'
import Dropzone from 'react-dropzone'
import { Select, Card } from '../../../components/index'
import styles from './AddIndex.module.scss'

export class ChooseSourceForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    getDatabases: PropTypes.func.isRequired,
    databases: PropTypes.object.isRequired,
    getFiles: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired,
    setUploadedFile: PropTypes.func.isRequired,
    file_token: PropTypes.string.isRequired,
    databaseId: PropTypes.string.isRequired,
  }

  componentDidMount () {
    const { getDatabases, setUploadedFile, getFiles, } = this.props
    getDatabases()
    getFiles()
    setUploadedFile(null)
  }

  render () {
    const {
      databases: { databases },
      files: { files },
      handleSubmit,
      file_token,
      databaseId,
    } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Card>
              <h6 className='text-center'>Create from database</h6>
              {databases && (
                <div>
                  <Field
                    name='databaseId'
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
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <h6 className='text-center'>Create from file</h6>
              <Field
                name='file_token'
                component={Select}
                type='select'
                label='Choose file'
                options={() => {
                  return files.map((file) => {
                    return [file.token, file.name]
                  })
                }}
                disabled={databaseId}
              />
            </Card>
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
