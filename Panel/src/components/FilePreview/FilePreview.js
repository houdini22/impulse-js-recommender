import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import { Table } from 'reactstrap'
import { Fieldset, LoadingOverlay } from 'components/index'
import styles from './FilePreview.module.scss'

class FilePreview extends React.Component {
  static propTypes = {
    fileInfo: PropTypes.object.isRequired,
    highlightFirstRow: PropTypes.bool,
  }

  render () {
    const { fileInfo, highlightFirstRow } = this.props

    return (
      <Fieldset title='File preview'>
        <div styleName='table-container-outer'>
          <div styleName='table-container-inner'>
            {(fileInfo && fileInfo.firstRows) && (
              <Table styleName='table' style={{ width: `${fileInfo.firstRows[0].length * 300}px` }}>
                <tbody>
                {fileInfo.firstRows && fileInfo.firstRows.map((row, i) => {
                  return (
                    <tr
                      className={i === 0 && highlightFirstRow ? 'background-red shaded' : ''}
                      key={i}
                    >
                      {row.map((column, j) => {
                        return (
                          <td
                            key={j}
                          >
                            {column}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
                </tbody>
              </Table>
            )}
          </div>
        </div>
        {(!fileInfo.firstRows) && (
          <LoadingOverlay />
        )}
      </Fieldset>
    )
  }
}

export default CSSModule(FilePreview, styles)
