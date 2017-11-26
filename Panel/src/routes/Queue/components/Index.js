import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Table, Button, Badge } from 'reactstrap'
import { Confirm } from '../../../components'
import { HeaderBar, HeaderMenuItem } from '../../../layouts/PageLayout/components'
import styles from './Index.module.scss'

export class QueueView extends React.Component {
  static propTypes = {
    getQueue: PropTypes.func.isRequired,
    queue: PropTypes.object.isRequired,
  }

  componentDidMount () {
    const { getQueue } = this.props
    getQueue()
  }

  render () {
    const {
      queue: { queue },
    } = this.props

    return (
      <div>
        <HeaderBar
          title='Queue'
        >
        </HeaderBar>
        <div className='page-content'>
          <div>
            <div>
              <Table striped>
                <thead>
                <tr>
                  <th style={{ width: '100px' }}>#</th>
                  <th>Task</th>
                  <th style={{ width: '200px' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {queue.map((queue) => {
                  return (
                    <tr key={queue.id}>
                      <th scope='row'>{queue.id}</th>
                      <td>
                        {queue.type}
                      </td>
                      <td className='actions'>
                        {queue.status === 'CREATED' && (
                          <Confirm
                            onYes={() => {
                              deleteQueue(queue.id)
                            }}
                            message='Are you sure to delete this Task?'
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
              </Table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CSSModules(QueueView, styles)
