import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Table, Button, Badge } from 'reactstrap'
import IconPlus from 'react-icons/lib/md/add'
import { StateButton, Confirm, Pagination } from '../../../components'
import { HeaderBar, HeaderMenuItem } from '../../../layouts/PageLayout/components'
import { formatDate } from '../../../helpers/date'
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
          title='Databases'
        >
          <HeaderMenuItem
            href='/app/index/add'
            color='success'
          >
            <IconPlus />
            {' '}
            Create
          </HeaderMenuItem>
        </HeaderBar>
        <div className='page-content'>
          <div>
            <div>
              <Table striped>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th style={{ width: '200px' }}>Created at</th>
                    <th style={{ width: '100px' }}>Status</th>
                    <th style={{ width: '150px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {indexes.map((index) => {
                    return (
                      <tr key={index.id}>
                        <td>
                          {index.databaseId > 0 && (
                          <Badge
                            color='info'
                            styleName='index-source'
                          >DB</Badge>
                        )}
                          {index.fileId > 0 && (
                          <Badge
                            color='info'
                            styleName='index-source'
                          >FILE</Badge>
                        )}
                          {index.name}
                        </td>
                        <td>
                          {formatDate(index.createdAt)}
                        </td>
                        <td>
                          {index.status}
                        </td>
                        <td className='actions'>
                          {index.status === 'CREATED' && (
                          <StateButton
                            size='sm'
                            onClick={() => {
                              buildIndex(index.id)
                            }}
                            isLoading={buildingInProgress}
                          >Build Index</StateButton>
                        )}
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
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan='4'>
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
