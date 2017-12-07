import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import IconPlus from 'react-icons/lib/md/add'
import { Link } from 'react-router'
import { Badge, Table, Button } from 'reactstrap'
import moment from 'moment'
import { Confirm, Pagination } from 'components'
import { HeaderBar, HeaderMenuItem } from 'layouts/PageLayout/components'
import { formatDate } from 'helpers/date-time'
import styles from './Files.module.scss'

export class FilesView extends React.Component {
  static propTypes = {
    files: PropTypes.object.isRequired,
    loadForFilesList: PropTypes.func.isRequired,
    removeFile: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { loadForFilesList } = this.props
    loadForFilesList()
  }

  render () {
    const { files: { files, pagination }, removeFile, loadForFilesList, } = this.props

    return (
      <div>
        <HeaderBar
          title='Files'
        >
          <HeaderMenuItem
            href='/app/file/add'
            color='success'
          >
            <IconPlus/>
            {' '}
            Upload
          </HeaderMenuItem>
        </HeaderBar>
        <div className='page-content'>
          <div>
            <div>
              <Table striped>
                <thead>
                <tr>
                  <th>Name</th>
                  <th style={{ width: '150px' }} className='hidden-sm hidden-xs'>Created at</th>
                  <th style={{ width: '150px' }}>Meta</th>
                  <th style={{ width: '150px' }}>Actions</th>
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
                      <td className='hidden-sm hidden-xs'>
                        {moment(file.createdAt).fromNow()}
                        <br/>
                        <span className='text-muted text-sm'>{formatDate(file.createdAt)}</span>
                      </td>
                      <td>
                        {file.fileSize}
                        <br/>
                        <strong>{file.linesCount}</strong> lines.
                        <br/>
                        <strong>{file.columnsCount}</strong> columns.
                      </td>
                      <td className='actions'>
                        <Link to={`/app/index/from_file/${file.id}`}>
                          <Button
                            size='sm'
                          >
                            Create Index
                          </Button>
                        </Link>
                        <Link to={`/app/file/edit/${file.id}`}>
                          <Button
                            size='sm'
                          >
                            Edit
                          </Button>
                        </Link>
                        {(file.canBeDeleted === 1) && (
                          <Confirm
                            onYes={() => {
                              removeFile(file.id)
                            }}
                            message={'Are you sure to delete this File?'}
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
                <tfoot>
                <tr>
                  <td colSpan='4'>
                    <Pagination
                      onPageChange={({ selected }) => {
                        loadForFilesList(selected)
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
