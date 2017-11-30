import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import IconPlus from 'react-icons/lib/md/add'
import { Badge, Table, Button, Tooltip } from 'reactstrap'
import moment from 'moment'
import { Confirm, Pagination } from 'components'
import { HeaderBar, HeaderMenuItem } from 'layouts/PageLayout/components'
import { formatDate } from 'helpers/date-time'
import styles from './Databases.module.scss'

export class SnapshotsView extends React.Component {
  static propTypes = {
    databases: PropTypes.object.isRequired,
    getDatabases: PropTypes.func.isRequired,
    deleteDatabase: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { getDatabases } = this.props
    getDatabases()
  }

  render () {
    const { databases: { databases, pagination }, deleteDatabase, getDatabases, } = this.props

    return (
      <div>
        <HeaderBar
          title='Databases'
        >
          <HeaderMenuItem
            href='/app/database/add'
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
                  {databases.map((database) => {
                    return (
                      <tr key={database.id}>
                        <td>
                          {database.type === 'mysql' && (
                          <Badge color='info' styleName='type-badge'>MySQL</Badge>
                        )}
                          {database.name}
                        </td>
                        <td>
                          {moment(database.createdAt).fromNow()}
                          <br/>
                          <span className='text-muted text-sm'>{formatDate(database.createdAt)}</span>
                        </td>
                        <td>
                          <h5 className='no-margin'>
                            <Badge
                              color={database.status === 'online' ? 'success' : 'danger'}
                          >
                              {database.status}
                            </Badge>
                          </h5>
                        </td>
                        <td className='actions'>
                          <Link to={`/app/database/edit/${database.id}`}>
                            <Button
                              size='sm'
                              color='secondary'
                          >
                            Edit
                          </Button>
                          </Link>
                          <Confirm
                            onYes={() => {
                              deleteDatabase(database.id)
                            }}
                            message='Are you sure to delete this Database?'
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
                    <td colSpan={4}>
                      <Pagination
                        onPageChange={({ selected }) => {
                          getDatabases(selected)
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
