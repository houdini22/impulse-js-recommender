import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import {Button, Modal, ModalHeader, ModalBody, Input, Form, FormGroup, Label} from 'reactstrap'
import styles from './Index.module.scss'

export class SnapshotsView extends React.Component {
  static propTypes = {
    getTables: PropTypes.func.isRequired,
    getRatingFields: PropTypes.func.isRequired,
    createSnapshot: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.toggleModal = this.toggleModal.bind(this)
    this.createModalIsVisible = false
    this.values = {}
  }

  componentWillUpdate(nextProps, nextState) {
    const { getTables, getRatingFields, snapshots: { tables, rating_fields } } = this.props
    const { snapshots: { createModalIsVisible, createModalStep } } = nextProps

    if (createModalIsVisible) {
      if (createModalStep === 1 && tables.length === 0 && nextProps.snapshots.tables.length === 0) {
        getTables()
      }
      if (createModalStep === 4 && rating_fields.length === 0 && nextProps.snapshots.rating_fields.length === 0) {
        getRatingFields(this.values.ratings_table_name)
      }
    }
  }

  toggleModal() {
    const { setCreateModalIsVisible } = this.props
    this.createModalIsVisible = !this.createModalIsVisible;
    setCreateModalIsVisible(this.createModalIsVisible)
  }

  setValue(name, value) {
    this.values[name] = value
  }

  modalGoNext() {
    const { snapshots: { createModalStep }, createSnapshot, setCreateModalStep } = this.props

    setCreateModalStep(createModalStep + 1)

    if (createModalStep === 5) {
      createSnapshot({
        ...this.values
      })
    }
  }

  render() {
    const { snapshots: { tables, rating_fields, createModalIsVisible, createModalStep } } = this.props

    return (
      <div>
        <div>
          <Button
            onClick={this.toggleModal}
          >Create Index</Button>
        </div>
        <div>

        </div>
        <Modal isOpen={createModalIsVisible} toggle={this.toggleModal} styleName='modal'>
          <ModalHeader toggle={this.toggleModal}>Create Index</ModalHeader>
          <ModalBody>
            {createModalStep === 1 && (
              <div>
                <h6>Choose your ITEM table.</h6>
                {tables && (
                  <form>
                    <Input type="select" onChange={(e) => {
                      this.setValue('items_table_name', e.target.value)
                    }}>
                      {tables.map((table) => {
                        return <option key={table} value={table}>{table}</option>
                      })}
                    </Input>
                  </form>
                )}
                <div>
                  <Button onClick={() => {
                    this.modalGoNext();
                  }}>Next</Button>
                </div>
              </div>
            )}
            {createModalStep === 2 && (
              <div>
                <h6>Choose your RATED BY table.</h6>
                {tables && (
                  <form>
                    <Input type="select" onChange={(e) => {
                      this.setValue('rated_by_table_name', e.target.value)
                    }}>
                      {tables.map((table) => {
                        return <option key={table} value={table}>{table}</option>
                      })}
                    </Input>
                  </form>
                )}
                <div>
                  <Button onClick={() => {
                    this.modalGoNext();
                  }}>Next</Button>
                </div>
              </div>
            )}
            {createModalStep === 3 && (
              <div>
                <h6>Choose your RATINGS table.</h6>
                {tables && (
                  <form>
                    <Input type="select" onChange={(e) => {
                      this.setValue('ratings_table_name', e.target.value)
                    }}>
                      {tables.map((table) => {
                        return <option key={table} value={table}>{table}</option>
                      })}
                    </Input>
                  </form>
                )}
                <div>
                  <Button onClick={() => {
                    this.modalGoNext();
                  }}>Next</Button>
                </div>
              </div>
            )}
            {createModalStep === 4 && (
              <div>
                <h6>Choose your RATINGS fields.</h6>
                {rating_fields && (
                  <form>
                    <FormGroup>
                      <Label for="field_item_id">Item ID field</Label>
                      <div>
                        <Input type="select" onChange={(e) => {
                          this.setValue('ratings_field_item_id', e.target.value)
                        }}>
                          {rating_fields.map((field) => {
                            return <option key={field} value={field}>{field}</option>
                          })}
                        </Input>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <Label for="field_item_id">Rated By ID field</Label>
                      <div>
                        <Input type="select" onChange={(e) => {
                          this.setValue('ratings_field_category_id', e.target.value)
                        }}>
                          {rating_fields.map((field) => {
                            return <option key={field} value={field}>{field}</option>
                          })}
                        </Input>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <Label for="field_item_id">Rating value</Label>
                      <div>
                        <Input type="select" onChange={(e) => {
                          this.setValue('ratings_field_value', e.target.value)
                        }}>
                          {rating_fields.map((field) => {
                            return <option key={field} value={field}>{field}</option>
                          })}
                        </Input>
                      </div>
                    </FormGroup>
                  </form>
                )}
                <div>
                  <Button onClick={() => {
                    this.modalGoNext();
                  }}>Next</Button>
                </div>
              </div>
            )}
            {createModalStep === 5 && (
              <div>
                <h6>Choose your INDEX name.</h6>
                <form>
                  <Input type="text" onChange={(e) => {
                    this.setValue('name', e.target.value)
                  }}/>
                </form>
                <div>
                  <Button onClick={() => {
                    this.modalGoNext();
                  }}>Next</Button>
                </div>
              </div>
            )}
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default CSSModules(SnapshotsView, styles)
