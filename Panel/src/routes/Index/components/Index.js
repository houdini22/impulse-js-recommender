import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import { Table, Button } from 'reactstrap'
import { StateButton, Confirm } from '../../../components'
import styles from './Index.module.scss'

export class SnapshotsView extends React.Component {
  static propTypes = {
    getTables: PropTypes.func.isRequired,
    getRatingFields: PropTypes.func.isRequired,
    getIndexes: PropTypes.func.isRequired,
    buildIndex: PropTypes.func.isRequired,
    deleteIndex: PropTypes.func.isRequired,
    snapshots: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)
    this.createModalIsVisible = false
    this.values = {}
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
        <div className='page-actions'>
          <Link to='/app/index/add'>
            <Button>Create Index</Button>
          </Link>
        </div>
        <div>
          <h5>Indexes</h5>
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
                    <td>{index.name}</td>
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
    )
  }
}

export default CSSModules(SnapshotsView, styles)
