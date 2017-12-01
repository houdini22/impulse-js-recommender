import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Table, Badge } from 'reactstrap'
import moment from 'moment'
import { Pagination, PageHeader } from 'components'
import { formatDate, msToTime } from 'helpers/date-time'
import styles from './Queue.module.scss'

export class QueueView extends React.Component {
  static propTypes = {
    loadFinishedTasks: PropTypes.func.isRequired,
    queueFinished: PropTypes.array.isRequired,
    paginationFinished: PropTypes.object.isRequired,
    loadingParts: PropTypes.func.isRequired,
  }

  render () {
    const {
      queueFinished,
      paginationFinished,
      loadingParts,
      loadFinishedTasks,
    } = this.props

    return (
      <div>
        <div>
          <PageHeader
            isLoading={loadingParts['finished_tasks']}
          >
            Finished tasks
          </PageHeader>
        </div>
        <div>
          <div>
            <Table striped>
              <thead>
              <tr>
                <th style={{ width: '100px' }}>Task</th>
                <th>Finished at</th>
                <th>Execution time</th>
              </tr>
              </thead>
              <tbody>
              {queueFinished.map((queue) => {
                return (
                  <tr key={queue.id}>
                    <td>
                      {queue.type === 'BUILD_INDEX' && (
                        <h6 className='no-margin'><Badge color='info'>Build index</Badge></h6>
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
      </div>
    )
  }
}

export default CSSModules(QueueView, styles)
