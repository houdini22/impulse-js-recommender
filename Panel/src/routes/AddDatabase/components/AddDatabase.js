import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import FormContainer from '../containers/FormContainer'
import { Panel } from '../../../components'
import styles from './AddDatabase.module.scss'

export class SnapshotsView extends React.Component {
  static propTypes = {
    databases: PropTypes.object.isRequired,
  }

  render () {
    return (
      <div>
        <Panel
          title='Add Database'
        >
          <FormContainer/>
        </Panel>
      </div>
    )
  }
}

export default CSSModules(SnapshotsView, styles)
