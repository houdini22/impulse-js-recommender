import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap'
import Step1FormContainer from '../containers/Step1FormContainer'
import Step2FormContainer from '../containers/Step2FormContainer'
import Step3FormContainer from '../containers/Step3FormContainer'
import Step4FormContainer from '../containers/Step4FormContainer'
import Step5FormContainer from '../containers/Step5FormContainer'
import { StateButton, Confirm } from '../../../components'
import styles from './Index.module.scss'

export class SnapshotsView extends React.Component {
  static propTypes = {
    getTables: PropTypes.func.isRequired,
    getRatingFields: PropTypes.func.isRequired,
    createSnapshot: PropTypes.func.isRequired,
    getIndexes: PropTypes.func.isRequired,
    buildIndex: PropTypes.func.isRequired,
    deleteIndex: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.openModal = this.openModal.bind(this)
    this.createModalIsVisible = false
    this.values = {}
  }

  componentDidMount () {
    const { getIndexes } = this.props
    getIndexes()
  }

  componentWillUpdate (nextProps, nextState) {
    const { getTables, getRatingFields, snapshots: { tables, rating_fields } } = this.props
    const { snapshots: { createModalStep, newSnapshot: { ratings_table_name } } } = nextProps

    if (createModalStep === 1 && tables.length === 0 && nextProps.snapshots.tables.length === 0) {
      getTables()
    }
    if (createModalStep === 4 && rating_fields.length === 0 && nextProps.snapshots.rating_fields.length === 0) {
      getRatingFields(ratings_table_name)
    }
  }

  openModal () {
    const { setCreateModalIsVisible } = this.props
    setCreateModalIsVisible(true)
  }

  render () {
    const {
      snapshots: { createModalIsVisible, createModalStep, indexes, buildingInProgress },
      buildIndex, deleteIndex
    } = this.props

    return (
      <div>
        <div className='page-actions'>
          <Button
            onClick={this.openModal}
          >Create Index</Button>
        </div>
        <div>
          <h5>Indexes</h5>
          <div>
            <Table striped>
              <thead>
              <tr>
                <th>#</th>
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
        <Modal isOpen={createModalIsVisible} styleName='modal'>
          <ModalHeader>Create Index</ModalHeader>
          <ModalBody>
            {createModalStep === 1 && (
              <Step1FormContainer/>
            )}
            {createModalStep === 2 && (
              <Step2FormContainer/>
            )}
            {createModalStep === 3 && (
              <Step3FormContainer/>
            )}
            {createModalStep === 4 && (
              <Step4FormContainer/>
            )}
            {createModalStep === 5 && (
              <Step5FormContainer/>
            )}
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
