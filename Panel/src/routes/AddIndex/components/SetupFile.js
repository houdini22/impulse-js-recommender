import React from 'react'
import PropTypes from 'prop-types'
import CSxsodules from 'react-css-modules'
import { Field } from 'redux-form'
import { Button, Table, Row, Col, ButtonGroup, Alert } from 'reactstrap'
import ExclamationIcon from 'react-icons/lib/fa/exclamation-circle'
import CheckIcon from 'react-icons/lib/fa/check-circle-o'
import { Checkbox, Fieldset, TextField } from '../../../components/index'
import styles from './AddIndex.module.scss'

export class SetupFile extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    getFileInfo: PropTypes.func.isRequired,
    snapshots: PropTypes.object.isRequired,
    change: PropTypes.func.isRequired,
    items_column: PropTypes.number,
    rated_by_column: PropTypes.number,
    rating_column: PropTypes.number,
  }

  constructor (props) {
    super(props)
    this.state = {
      hasHeaderRow: false,
    }
  }

  componentDidMount () {
    const {
      getFileInfo,
      snapshots: { newSnapshot }
    } = this.props

    getFileInfo(newSnapshot.file_token)
  }

  render () {
    const {
      handleSubmit,
      change,
      items_column,
      rated_by_column,
      rating_column,
      snapshots: { uploadedFileInfo }
    } = this.props

    const {
      hasHeaderRow
    } = this.state

    return (
      <form onSubmit={handleSubmit}>
        <Fieldset
          title='Choose column roles'
        >
          {uploadedFileInfo && (
            <div>
              <Alert
                styleName='error-alert'
                color={(items_column === -1 || rated_by_column === -1 || rating_column === -1) ? 'danger' : 'success'}
              >
                {(items_column === -1 || rated_by_column === -1 || rating_column === -1) && (
                  <ExclamationIcon/>
                )}
                {(items_column !== -1 && rated_by_column !== -1 && rating_column !== -1) && (
                  <CheckIcon/>
                )}
                Mark all columns.
              </Alert>
              <div styleName='table-container-outer'>
                <div styleName='table-container-inner'>
                  <Table styleName='table' style={{ width: `${uploadedFileInfo.firstRows[0].length * 300}px` }}>
                    <thead>
                    <tr>
                      {uploadedFileInfo.firstRows && uploadedFileInfo.firstRows[0].map((field, i) => {
                        return (
                          <th
                            key={i}
                          >
                            Column {i + 1}
                            <ButtonGroup styleName='button-group'>
                              <Button
                                size='xs'
                                onClick={() => {
                                  if (items_column === i) {
                                    change('items_column', -1)
                                  } else {
                                    change('items_column', i)
                                  }
                                }}
                                disabled={(items_column >= 0 && items_column !== i) || rated_by_column === i || rating_column === i}
                                color={items_column === i ? 'success' : 'secondary'}
                              >
                                Items
                              </Button>{' '}
                              <Button
                                size='xs'
                                onClick={() => {
                                  if (rated_by_column === i) {
                                    change('rated_by_column', -1)
                                  } else {
                                    change('rated_by_column', i)
                                  }
                                }}
                                disabled={(rated_by_column >= 0 && rated_by_column !== i) || items_column === i || rating_column === i}
                                color={rated_by_column === i ? 'success' : 'secondary'}
                              >
                                Rated by
                              </Button>{' '}
                              <Button
                                size='xs'
                                onClick={() => {
                                  if (rating_column === i) {
                                    change('rating_column', -1)
                                  } else {
                                    change('rating_column', i)
                                  }
                                }}
                                disabled={(rating_column >= 0 && rating_column !== i) || items_column === i || rated_by_column === i}
                                color={rating_column === i ? 'success' : 'secondary'}
                              >Rating</Button>
                            </ButtonGroup>
                          </th>
                        )
                      })}
                    </tr>
                    </thead>
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
              <Field
                name='items_column'
                component='input'
                type='hidden'
              />
              <Field
                name='rated_by_column'
                component='input'
                type='hidden'
              />
              <Field
                name='rating_column'
                component='input'
                type='hidden'
              />
            </div>
          )}
        </Fieldset>
        <Fieldset
          title='Common'
        >
          <Field
            name='name'
            component={TextField}
            type='text'
            label='Index Name'
          />
        </Fieldset>
        <Row className='buttons-row'>
          <Col md={12}>
            <div className='text-right'>
              <Button type='submit' color='success'>Save</Button>
            </div>
          </Col>
        </Row>
      </form>
    )
  }
}

export default CSxsodules(SetupFile, styles)
