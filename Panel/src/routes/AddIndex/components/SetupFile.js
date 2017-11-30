import React from 'react'
import PropTypes from 'prop-types'
import CSxsodules from 'react-css-modules'
import { Field } from 'redux-form'
import { Button, Table, Row, Col, ButtonGroup, Alert } from 'reactstrap'
import ExclamationIcon from 'react-icons/lib/fa/exclamation-circle'
import CheckIcon from 'react-icons/lib/fa/check-circle-o'
import { Fieldset, TextField } from 'components'
import styles from './AddIndex.module.scss'

export class SetupFile extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    getFileInfo: PropTypes.func.isRequired,
    snapshots: PropTypes.object.isRequired,
    change: PropTypes.func.isRequired,
    itemsColumn: PropTypes.number,
    ratedByColumn: PropTypes.number,
    ratingColumn: PropTypes.number,
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

    getFileInfo(newSnapshot.fileToken)
  }

  render () {
    const {
      handleSubmit,
      change,
      itemsColumn,
      ratedByColumn,
      ratingColumn,
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
                color={(itemsColumn === -1 || ratedByColumn === -1 || ratingColumn === -1) ? 'danger' : 'success'}
              >
                {(itemsColumn === -1 || ratedByColumn === -1 || ratingColumn === -1) && (
                  <ExclamationIcon />
                )}
                {(itemsColumn !== -1 && ratedByColumn !== -1 && ratingColumn !== -1) && (
                  <CheckIcon />
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
                                    if (itemsColumn === i) {
                                      change('itemsColumn', -1)
                                    } else {
                                      change('itemsColumn', i)
                                    }
                                  }}
                                  disabled={(itemsColumn >= 0 && itemsColumn !== i) || ratedByColumn === i || ratingColumn === i}
                                  color={itemsColumn === i ? 'success' : 'secondary'}
                              >
                                Items
                              </Button>{' '}
                                <Button
                                  size='xs'
                                  onClick={() => {
                                    if (ratedByColumn === i) {
                                      change('ratedByColumn', -1)
                                    } else {
                                      change('ratedByColumn', i)
                                    }
                                  }}
                                  disabled={(ratedByColumn >= 0 && ratedByColumn !== i) || itemsColumn === i || ratingColumn === i}
                                  color={ratedByColumn === i ? 'success' : 'secondary'}
                              >
                                Rated by
                              </Button>{' '}
                                <Button
                                  size='xs'
                                  onClick={() => {
                                    if (ratingColumn === i) {
                                      change('ratingColumn', -1)
                                    } else {
                                      change('ratingColumn', i)
                                    }
                                  }}
                                  disabled={(ratingColumn >= 0 && ratingColumn !== i) || itemsColumn === i || ratedByColumn === i}
                                  color={ratingColumn === i ? 'success' : 'secondary'}
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
                name='itemsColumn'
                component='input'
                type='hidden'
              />
              <Field
                name='ratedByColumn'
                component='input'
                type='hidden'
              />
              <Field
                name='ratingColumn'
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
