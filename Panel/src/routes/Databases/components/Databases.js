import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap'
import { StateButton, Confirm } from '../../../components'
import FormContainer from '../containers/FormContainer'
import styles from './Databases.module.scss'

export class SnapshotsView extends React.Component {
  static propTypes = {
    databases: PropTypes.object.isRequired,
    getDatabases: PropTypes.func.isRequired,
    setCreateModalIsVisible: PropTypes.func.isRequired,
    deleteDatabase: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.openModal = this.openModal.bind(this)
  }

  componentDidMount () {
    const { getDatabases } = this.props
    getDatabases()
  }

  openModal () {
    const { setCreateModalIsVisible } = this.props
    setCreateModalIsVisible(true)
  }

  render () {
    const { databases: { databases, createModalIsVisible }, deleteDatabase } = this.props

    return (
      <div>
        <div className='page-actions'>
          <Button
            onClick={this.openModal}
          >Add Database</Button>
        </div>
        <div>
          <h5>Databases</h5>
          <div>
            <Table striped>
              <thead>
              <tr>
                <th style={{ width: '100px' }}>#</th>
                <th>Name</th>
                <th style={{ width: '200px' }}>Status</th>
              </tr>
              </thead>
              <tbody>
              {databases.map((database) => {
                return (
                  <tr key={database.id}>
                    <th scope='row'>{database.id}</th>
                    <td>{database.name}</td>
                    <td className='table-row-actions'>
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
        <Modal isOpen={createModalIsVisible}>
          <ModalHeader>Add Database</ModalHeader>
          <ModalBody>
            <FormContainer/>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                const { setCreateModalIsVisible } = this.props
                setCreateModalIsVisible(false)
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default CSSModules(SnapshotsView, styles)
