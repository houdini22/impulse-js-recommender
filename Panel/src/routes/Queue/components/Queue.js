import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Table, Row, Col, Badge } from 'reactstrap'
import ClockIcon from 'react-icons/lib/fa/clock-o'
import { Confirm, IconBox, Pagination, PageHeader } from 'components'
import { HeaderBar } from 'layouts/PageLayout/components'
import QueueFinishedTasks from './QueueFinishedTasks'
import { msToTime } from 'helpers/date-time'
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
        queueTimeSummary,
        loadingParts
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
                isLoading={loadingParts['time_summary']}
              >
                Used server time:
                <br/>
                <strong>{msToTime(queueTimeSummary.sum)} ms</strong>
              </IconBox>
            </Col>
          </Row>
          <Row>
            <Col md={6} sm={12} xs={12}>
              <QueueFinishedTasks
                queueFinished={queueFinished}
                paginationFinished={paginationFinished}
                loadingParts={loadingParts}
              />
            </Col>
            <Col md={6} sm={12} xs={12}>
              <div>
                <PageHeader
                  isLoading={loadingParts['running_tasks']}
                >
                  Running tasks
                </PageHeader>
              </div>
              <div>
                <div>
                  <Table striped>
                    <thead>
                    <tr>
                      <th>Task</th>
                    </tr>
                    </thead>
                    <tbody>
                    {queueRunning.map((queue) => {
                      return (
                        <tr key={queue.id}>
                          <td>
                            {queue.type === 'BUILD_INDEX' && (
                              <h6 className='no-margin'><Badge color='info'>Build index</Badge></h6>
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
                <PageHeader
                  isLoading={loadingParts['awaiting_tasks']}
                >
                  Awaiting tasks
                </PageHeader>
              </div>
              <div>
                <div>
                  <Table striped>
                    <thead>
                    <tr>
                      <th style={{ width: '150px' }}>Task</th>
                      <th>Place in queue</th>
                    </tr>
                    </thead>
                    <tbody>
                    {queueAwaiting.map((queue) => {
                      return (
                        <tr key={queue.id}>
                          <td>
                            {queue.type === 'BUILD_INDEX' && (
                              <h6 className='no-margin'><Badge color='info'>Build index</Badge></h6>
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
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default CSSModules(QueueView, styles)
