import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import { Table, Button, Badge } from 'reactstrap'
import IconPlus from 'react-icons/lib/fa/plus-circle'
import { StateButton, Confirm } from '../../../components'
import { ContainerHeader, HeaderMenu, HeaderMenuItem } from '../../../layouts/PageLayout/components'
import styles from './Index.module.scss'

export class SnapshotsView extends React.Component {
  static propTypes = {
    getIndexes: PropTypes.func.isRequired,
    buildIndex: PropTypes.func.isRequired,
    deleteIndex: PropTypes.func.isRequired,
    snapshots: PropTypes.object.isRequired,
  }

  componentDidMount () {
    const { getIndexes } = this.props
    getIndexes()
  }

  render () {
    const {
      snapshots: { indexes, buildingInProgress },
      buildIndex, deleteIndex
    } = this.props

    return (
      <div>
        <ContainerHeader>
          <HeaderMenu>
            <div>
              <HeaderMenuItem
                href='/app/index/add'
                color='success'
              >
                <IconPlus/>
                {' '}
                Create
              </HeaderMenuItem>
            </div>
          </HeaderMenu>
          <h1>Indexes</h1>
        </ContainerHeader>
        <div className='page-content'>
          <div>
            <div>
              <Table striped>
                <thead>
                <tr>
                  <th style={{ width: '100px' }}>#</th>
                  <th>Name</th>
                  <th style={{ width: '200px' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {indexes.map((index) => {
                  return (
                    <tr key={index.id}>
                      <th scope='row'>{index.id}</th>
                      <td>
                        {index.database_id > 0 && (
                          <Badge
                            color='info'
                            styleName='index-source'
                          >DB</Badge>
                        )}
                        {index.file_id > 0 && (
                          <Badge
                            color='info'
                            styleName='index-source'
                          >FILE</Badge>
                        )}
                        {index.name}
                      </td>
                      <td className='table-row-actions'>
                        {!index.is_built && (
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
                          message='Are you sure to delete Index?'
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
