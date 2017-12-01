import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import IconPlus from 'react-icons/lib/md/add'
import { Badge, Table, Button } from 'reactstrap'
import moment from 'moment'
import { Confirm, Pagination } from 'components'
import { HeaderBar, HeaderMenuItem } from 'layouts/PageLayout/components'
import { formatDate } from 'helpers/date-time'
import styles from './Files.module.scss'

export class FilesView extends React.Component {
  static propTypes = {
    files: PropTypes.object.isRequired,
    getFiles: PropTypes.func.isRequired,
    deleteFile: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { getFiles } = this.props
    getFiles()
  }

  render () {
    const { files: { files, pagination }, deleteFile, getFiles, } = this.props

    return (
      <div>
        <HeaderBar
          title='Files'
        >
          <HeaderMenuItem
            href='/app/file/add'
            color='success'
          >
            <IconPlus />
            {' '}
            Create
          </HeaderMenuItem>
        </HeaderBar>
        <div className='page-content'>
          <div>
            <div>
              <Table striped>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th style={{ width: '200px' }}>Created at</th>
                    <th style={{ width: '200px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => {
                    return (
                      <tr key={file.id}>
                        <td>
                          <h6 className='no-margin'>
                            <Badge color='info'>
                              {file.format === 'csv' && (
                                <span>CSV</span>
                              )}
                            </Badge>
                          </h6>
                          {' '}
                          {file.name}
                        </td>
                        <td>
                          {moment(file.createdAt).fromNow()}
                          <br/>
                          <span className='text-muted text-sm'>{formatDate(file.createdAt)}</span>
                        </td>
                        <td className='actions'>
                          <Confirm
                            onYes={() => {
                              deleteFile(file.id)
                            }}
                            message={'Are you sure to delete this File?'}
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
                <tfoot>
                  <tr>
                    <td colSpan='3'>
                      <Pagination
                        onPageChange={({ selected }) => {
                          getFiles(selected)
                        }}
                        pageCount={pagination.totalPages}
                        limit={pagination.limit}
                        totalItems={pagination.totalItems}
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

export default CSSModules(FilesView, styles)
