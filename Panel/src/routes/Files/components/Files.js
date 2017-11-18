import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import IconPlus from 'react-icons/lib/fa/plus-circle'
import { Badge, Table, Button } from 'reactstrap'
import { Confirm } from '../../../components'
import { ContainerHeader, HeaderMenu, HeaderMenuItem } from '../../../layouts/PageLayout/components'
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
    const { files: { files }, deleteFile } = this.props

    return (
      <div>
        <ContainerHeader>
          <HeaderMenu>
            <div>
              <HeaderMenuItem
                href='/app/file/add'
                color='success'
              >
                <IconPlus/>
                {' '}
                Create
              </HeaderMenuItem>
            </div>
          </HeaderMenu>
          <h1>Files</h1>
        </ContainerHeader>
        <div className='page-content'>
          <div>
            <div>
              <Table striped>
                <thead>
                <tr>
                  <th style={{ width: '100px' }}>#</th>
                  <th>Name</th>
                  <th style={{ width: '200px' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {files.map((file) => {
                  return (
                    <tr key={file.id}>
                      <th scope='row'>{file.id}</th>
                      <td>
                        <Badge color='info' styleName='format-badge'>
                          {file.format === 'csv' && (
                            <span>CSV</span>
                          )}
                        </Badge>
                        {' '}
                        {file.name}
                      </td>
                      <td className='table-row-actions'>
                        <Confirm
                          onYes={() => {
                            deleteFile(file.id)
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
        </div>
      </div>
    )
  }
}

export default CSSModules(FilesView, styles)
