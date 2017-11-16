import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Field } from 'redux-form'
import { Button, Table, Row, Col } from 'reactstrap'
import { Checkbox, Fieldset } from '../../../components/index'
import styles from './AddIndex.module.scss'

export class SetupFile extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    getFileInfo: PropTypes.func.isRequired,
    snapshots: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      hasHeaderRow: false
    }
  }

  componentDidMount () {
    const {
      getFileInfo,
      snapshots: { uploadedFile }
    } = this.props
    getFileInfo(uploadedFile.token)
  }

  render () {
    const {
      handleSubmit,
      snapshots: { uploadedFileInfo }
    } = this.props

    const {
      hasHeaderRow
    } = this.state

    return (
      <form onSubmit={handleSubmit}>
        <Fieldset
          title='File information'
        >
          <Field
            name='has_header_row'
            component={Checkbox}
            type='checkbox'
            label='File contains header row?'
            onChange={(e, value) => {
              this.setState({
                hasHeaderRow: value
              })
            }}
          />
        </Fieldset>
        <Fieldset
          title="Choose column roles"
        >
          {uploadedFileInfo && (
            <Table>
              <thead>
              <tr>
                {uploadedFileInfo.firstRows && uploadedFileInfo.firstRows[0].map((field, i) => {
                  return (
                    <th
                      key={i}
                    >Column {i + 1}</th>
                  )
                })}
              </tr>
              </thead>
              <tbody>
              {uploadedFileInfo.firstRows && uploadedFileInfo.firstRows.map((row, i) => {
                return (
                  <tr
                    className={i === 0 && hasHeaderRow ? 'background-red' : ''}
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
          )}
        </Fieldset>
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

export default CSSModules(SetupFile, styles)
