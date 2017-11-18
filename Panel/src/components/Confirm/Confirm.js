import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap'
import _ from 'underscore'
import styles from './Confirm.module.scss'

class Confirm extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    message: PropTypes.string.isRequired,
    onYes: PropTypes.func,
    onNo: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.state = {
      isOpened: false
    }
  }

  close () {
    this.setState({
      isOpened: false
    })
  }

  open () {
    this.setState({
      isOpened: true
    })
  }

  render () {
    const { onYes, onNo, children, message } = this.props
    const { isOpened } = this.state

    return (
      <div style={{ display: 'inline-block' }}>
        <Modal isOpen={isOpened}>
          <ModalHeader>Confirm</ModalHeader>
          <ModalBody>{message}</ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={() => {
              if (_.isFunction(onYes)) {
                onYes()
              }
              this.close()
            }}>Confirm</Button>{' '}
            <Button color='secondary' onClick={() => {
              if (_.isFunction(onNo)) {
                onNo()
              }
              this.close()
            }}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <div onClick={() => {
          this.open()
        }}>
          {children}
        </div>
      </div>
    )
  }
}

export default CSSModule(Confirm, styles)
