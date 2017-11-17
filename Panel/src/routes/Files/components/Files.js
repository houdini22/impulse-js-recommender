import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import IconPlus from 'react-icons/lib/fa/plus-circle'
import { Badge, Table, Button } from 'reactstrap'
import { Confirm } from '../../../components'
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
        <div className='page-actions'>
          <Link to='/app/file/add'>
            <Button color='success'><IconPlus/> Add File</Button>
          </Link>
        </div>
        <div>
          <h5>Files</h5>
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
                      <Badge color='info' styleName='format-badge'>{file.format}</Badge>
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
    )
  }
}

export default CSSModules(FilesView, styles)
