import React from 'react'
import PropTypes from 'prop-types'
import CSxsodules from 'react-css-modules'
import { Field } from 'redux-form'
import { Button, Table, Row, Col, ButtonGroup, Alert } from 'reactstrap'
import { HeaderBar } from 'layouts/PageLayout/components'
import ExclamationIcon from 'react-icons/lib/fa/exclamation-circle'
import CheckIcon from 'react-icons/lib/fa/check-circle-o'
import { Fieldset, TextField } from 'components'
import styles from './CreateIndexFromFile.module.scss'

export class CreateIndexFromFile extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    loadForCreateIndex: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired,
    change: PropTypes.func.isRequired,
    itemsColumn: PropTypes.number,
    ratedByColumn: PropTypes.number,
    ratingColumn: PropTypes.number,
    routeParams: PropTypes.object.isRequired,
    name: PropTypes.string,
  }

  constructor (props) {
    super(props)
    this.state = {
      hasHeaderRow: false,
    }
  }

  componentDidMount () {
    const {
      loadForCreateIndex,
      routeParams: { id },
    } = this.props

    loadForCreateIndex(id)
  }

  componentWillReceiveProps (nextProps) {
    const { files: { file }, change } = nextProps
    if (this.props.name === null && file.name) {
      change('name', file.name)
      change('fileId', file.id)
    }
  }

  render () {
    const {
      handleSubmit,
      change,
      itemsColumn,
      ratedByColumn,
      ratingColumn,
      files: { file, fileInfo }
    } = this.props

    const {
      hasHeaderRow
    } = this.state

    return (
      <div>
        <HeaderBar
          title='Create index from file'
          back='/app/file'
        />
        <div className='page-content'>
          {(file && fileInfo) && (
            <form onSubmit={handleSubmit}>
              <Fieldset
                title='Choose column roles'
              >
                {(!!fileInfo && !!fileInfo.firstRows) && (
                  <div>
                    <Alert
                      styleName='error-alert'
                      color={(itemsColumn === -1 || ratedByColumn === -1 || ratingColumn === -1) ? 'danger' : 'success'}
                    >
                      {(itemsColumn === -1 || ratedByColumn === -1 || ratingColumn === -1) && (
                        <ExclamationIcon/>
                      )}
                      {(itemsColumn !== -1 && ratedByColumn !== -1 && ratingColumn !== -1) && (
                        <CheckIcon/>
                      )}
                      Mark all columns.
                    </Alert>
                    <div styleName='table-container-outer'>
                      <div styleName='table-container-inner'>
                        <Table styleName='table' style={{ width: `${fileInfo.firstRows[0].length * 300}px` }}>
                          <thead>
                          <tr>
                            {fileInfo.firstRows && fileInfo.firstRows[0].map((field, i) => {
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
                                      Subject
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
                                      User
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
                                    >
                                      Rating
                                    </Button>
                                  </ButtonGroup>
                                </th>
                              )
                            })}
                          </tr>
                          </thead>
                          <tbody>
                          {fileInfo.firstRows && fileInfo.firstRows.map((row, i) => {
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
          )}
        </div>
      </div>
    )
  }
}

export default CSxsodules(CreateIndexFromFile, styles)
