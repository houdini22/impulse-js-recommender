import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import {Field} from 'redux-form'
import {Button} from 'reactstrap'
import {Select} from '../../../components'
import styles from './Index.module.scss'

export class SnapshotsView extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    snapshots: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {
      snapshots: { tables },
      handleSubmit
    } = this.props

    return (
      <div>
        <h6>Choose your RATINGS table name.</h6>
        {tables && (
          <form onSubmit={handleSubmit}>
            <Field
              name='ratings_table_name'
              component={Select}
              type='select'
              placeholder='RATINGS table name'
              options={tables}
            />
            <div className='text-right'>
              <Button type='submit'>Next</Button>
            </div>
          </form>
        )}
      </div>
    )
  }
}

export default CSSModules(SnapshotsView, styles)
