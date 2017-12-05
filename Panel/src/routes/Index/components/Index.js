import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Table, Button, Badge } from 'reactstrap'
import moment from 'moment'
import { Link } from 'react-router'
import { StateButton, Confirm, Pagination } from 'components'
import { HeaderBar, HeaderMenuItem } from 'layouts/PageLayout/components'
import { formatDate } from 'helpers/date-time'
import styles from './Index.module.scss'

export class SnapshotsView extends React.Component {
  static propTypes = {
    getSnapshots: PropTypes.func.isRequired,
    buildIndex: PropTypes.func.isRequired,
    deleteIndex: PropTypes.func.isRequired,
    snapshots: PropTypes.object.isRequired,
  }

  componentDidMount () {
    const { getSnapshots } = this.props
    getSnapshots()
  }

  render () {
    const {
      snapshots: { indexes, buildingInProgress, pagination },
      buildIndex, deleteIndex, getSnapshots
    } = this.props

    return (
      <div>
        <HeaderBar
          title='Indexes'
        >
        </HeaderBar>
        <div className='page-content'>
          <div>
            <div>
              <Table striped>
                <thead>
                <tr>
                  <th>Name</th>
                  <th style={{ width: '150px' }} className='hidden-sm hidden-xs'>Created at</th>
                  <th style={{ width: '100px' }}>Status</th>
                  <th style={{ width: '150px' }}>Meta</th>
                  <th style={{ width: '150px' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {indexes.map((index) => {
                  return (
                    <tr key={index.id}>
                      <td>
                        {index.databaseId > 0 && (
                          <h6>
                            <Badge
                              color='info'
                              styleName='index-source'
                            >DB</Badge>
                          </h6>
                        )}
                        {index.fileId > 0 && (
                          <h6 className='no-margin'>
                            <Badge
                              color='info'
                            >FILE</Badge>
                          </h6>
                        )}
                        {index.name}
                      </td>
                      <td className='hidden-sm hidden-xs'>
                        {moment(index.createdAt).fromNow()}
                        <br/>
                        <span className='text-muted text-sm'>{formatDate(index.createdAt)}</span>
                      </td>
                      <td>
                        {index.status}
                      </td>
                      <td>
                        {(index.status !== 'PARSED') && (
                          <span className='text-muted'>not built</span>
                        )}
                        {(index.status === 'PARSED') && (
                          <div style={{fontSize: '11px'}}>
                            <strong>{index.subjectsCount}</strong> items.<br/>
                            <strong>{index.usersCount}</strong> users.<br/>
                            <strong>{index.ratingsCount}</strong> ratings.<br/>
                            <strong>{(index.density * 100).toFixed(4)}%</strong> density.
                          </div>
                        )}
                      </td>
                      <td className='actions'>
                        {(index.status === 'PARSED') && (
                          <Link to={`/app/model/create/${index.id}`}>
                            <Button
                              size='sm'
                            >
                              Create Model
                            </Button>
                          </Link>
                        )}
                        {index.status === 'CREATED' && (
                          <StateButton
                            size='sm'
                            onClick={() => {
                              buildIndex(index.id)
                            }}
                            isLoading={buildingInProgress}
                          >Build Index</StateButton>
                        )}
                        {(index.canBeDeleted === 1) && (
                          <Confirm
                            onYes={() => {
                              deleteIndex(index.id)
                            }}
                            message='Are you sure to delete this Index?'
                          >
                            <Button
                              size='sm'
                              color='danger'
                            >Delete</Button>
                          </Confirm>
                        )}
                      </td>
                    </tr>
                  )
                })}
                </tbody>
                <tfoot>
                <tr>
                  <td colSpan='5'>
                    <Pagination
                      onPageChange={({ selected }) => {
                        getSnapshots(selected)
                      }}
                      pageCount={pagination.totalPages}
                      limit={pagination.limit}
                      totalItems={pagination.totalItems}
                    />
                  </td>
                </tr>
                </tfoot>
              </Table>
            </div>
          </div>
        </div>
      </div>
  )
  }
  }

  export default CSSModules(SnapshotsView, styles)
