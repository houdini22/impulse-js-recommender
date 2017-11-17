import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import IconPlus from 'react-icons/lib/fa/plus-circle'
import { Badge, Table, Button } from 'reactstrap'
import { Confirm } from '../../../components'
import { ContainerHeader, HeaderMenu, HeaderMenuItem } from '../../../layouts/PageLayout/components'
import styles from './Databases.module.scss'

export class SnapshotsView extends React.Component {
  static propTypes = {
    databases: PropTypes.object.isRequired,
    getDatabases: PropTypes.func.isRequired,
    deleteDatabase: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { getDatabases } = this.props
    getDatabases()
  }

  render () {
    const { databases: { databases }, deleteDatabase } = this.props

    return (
      <div>
        <ContainerHeader>
          <HeaderMenu>
            <div>
              <HeaderMenuItem
                href='/app/database/add'
              >
                <IconPlus/>
                {' '}
                Create Database
              </HeaderMenuItem>
            </div>
          </HeaderMenu>
          <h1>Databases</h1>
        </ContainerHeader>
        <div className='page-content'>
          <div>
            <div>
              <Table striped>
                <thead>
                <tr>
                  <th style={{ width: '100px' }}>#</th>
                  <th>Name</th>
                  <th style={{ width: '100px' }}>Status</th>
                  <th style={{ width: '200px' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {databases.map((database) => {
                  return (
                    <tr key={database.id}>
                      <th scope='row'>{database.id}</th>
                      <td>
                        {database.type === 'mysql' && (
                          <Badge color='info' styleName='type-badge'>MySQL</Badge>
                        )}
                        {database.name}
                      </td>
                      <td>
                        <h5>
                          <Badge
                            color={database.status === 'online' ? 'success' : 'danger'}
                          >
                            {database.status}
                          </Badge>
                        </h5>
                      </td>
                      <td className='table-row-actions'>
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
                          message='Are you sure to delete Database?'
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
              </Table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CSSModules(SnapshotsView, styles)
