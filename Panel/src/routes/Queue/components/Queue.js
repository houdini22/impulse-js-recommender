import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Table, Button, Row, Col, Badge } from 'reactstrap'
import ClockIcon from 'react-icons/lib/fa/clock-o'
import moment from 'moment'
import { Confirm, IconBox, Pagination } from 'components'
import { HeaderBar } from 'layouts/PageLayout/components'
import { formatDate, msToTime } from 'helpers/date-time'
import styles from './Queue.module.scss'

export class QueueView extends React.Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    loadFinishedTasks: PropTypes.func.isRequired,
    queue: PropTypes.object.isRequired,
    deleteQueue: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { load } = this.props
    load()
  }

  render () {
    const {
      queue: {
        queueFinished: { queueFinished, paginationFinished },
        queueAwaiting: { queueAwaiting, paginationAwaiting },
        queueRunning: { queueRunning, paginationRunning },
        queueTimeSummary
      },
      deleteQueue,
      loadFinishedTasks,
    } = this.props

    return (
      <div>
        <HeaderBar
          title='Queue'
        />
        <div className='page-content'>
          <Row>
            <Col md={4} sm={6} xs={12}>
              <IconBox
                icon={<ClockIcon/>}
              >
                Used server time: <strong>{msToTime(queueTimeSummary.sum)} ms</strong>
              </IconBox>
            </Col>
          </Row>
          <div>
            <h3>Finished tasks</h3>
          </div>
          <div>
            <div>
              <Table striped>
                <thead>
                <tr>
                  <th style={{ width: '100px' }}>#</th>
                  <th style={{ width: '150px' }}>Task</th>
                  <th>Finished at</th>
                  <th>Execution time</th>
                </tr>
                </thead>
                <tbody>
                {queueFinished.map((queue) => {
                  return (
                    <tr key={queue.id}>
                      <th scope='row'>{queue.id}</th>
                      <td>
                        {queue.type === 'BUILD_INDEX' && (
                          <h5><Badge color='info'>Build index</Badge></h5>
                        )}
                      </td>
                      <td>
                        {moment(queue.createdAt).fromNow()}
                        <br/>
                        <span className='text-muted text-sm'>{formatDate(queue.createdAt)}</span>
                      </td>
                      <td>
                        {msToTime(queue.executionTime)}
                      </td>
                    </tr>
                  )
                })}
                </tbody>
                <tfoot>
                <tr>
                  <td colSpan={5}>
                    <Pagination
                      onPageChange={({ selected }) => {
                        loadFinishedTasks(selected)
                      }}
                      pageCount={paginationFinished.totalPages}
                      limit={paginationFinished.limit}
                      totalItems={paginationFinished.totalItems}
                    />
                  </td>
                </tr>
                </tfoot>
              </Table>
            </div>
          </div>
          <div>
            <h3>Running tasks</h3>
          </div>
          <div>
            <div>
              <Table striped>
                <thead>
                <tr>
                  <th style={{ width: '100px' }}>#</th>
                  <th style={{ width: '150px' }}>Task</th>
                </tr>
                </thead>
                <tbody>
                {queueRunning.map((queue) => {
                  return (
                    <tr key={queue.id}>
                      <th scope='row'>{queue.id}</th>
                      <td>
                        {queue.type === 'BUILD_INDEX' && (
                          <h5><Badge color='info'>Build index</Badge></h5>
                        )}
                      </td>
                    </tr>
                  )
                })}
                </tbody>
                <tfoot>
                <tr>
                  <td colSpan={5}>
                    <Pagination
                      onPageChange={({ selected }) => {
                        loadRunningTasks(selected)
                      }}
                      pageCount={paginationRunning.totalPages}
                      limit={paginationRunning.limit}
                      totalItems={paginationRunning.totalItems}
                    />
                  </td>
                </tr>
                </tfoot>
              </Table>
            </div>
          </div>
          <div>
            <h3>Awaiting tasks</h3>
          </div>
          <div>
            <div>
              <Table striped>
                <thead>
                <tr>
                  <th style={{ width: '100px' }}>#</th>
                  <th style={{ width: '150px' }}>Task</th>
                  <th>Place in queue</th>
                </tr>
                </thead>
                <tbody>
                {queueAwaiting.map((queue) => {
                  return (
                    <tr key={queue.id}>
                      <th scope='row'>{queue.id}</th>
                      <td>
                        {queue.type === 'BUILD_INDEX' && (
                          <h5><Badge color='info'>Build index</Badge></h5>
                        )}
                      </td>
                      <td>
                        {queue.place}
                      </td>
                    </tr>
                  )
                })}
                </tbody>
                <tfoot>
                <tr>
                  <td colSpan={5}>
                    <Pagination
                      onPageChange={({ selected }) => {
                        loadAwaitingTasks(selected)
                      }}
                      pageCount={paginationAwaiting.totalPages}
                      limit={paginationAwaiting.limit}
                      totalItems={paginationAwaiting.totalItems}
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

export default CSSModules(QueueView, styles)
