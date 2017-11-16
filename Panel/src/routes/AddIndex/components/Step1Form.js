import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Field } from 'redux-form'
import { Button } from 'reactstrap'
import { Select } from '../../../components/index'
import styles from '../../Index/components/Index.module.scss'

export class SnapshotsView extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    snapshots: PropTypes.object.isRequired
  }

  render () {
    const {
      snapshots: { tables },
      handleSubmit
    } = this.props

    return (
      <div>
        <h6>Choose tables.</h6>
        {tables && (
          <form onSubmit={handleSubmit}>
            <Field
              name='items_table_name'
              component={Select}
              type='select'
              label='Choose your rated items table'
              placeholder='Rated Items table name'
              options={tables}
            />
            <Field
              name='rated_by_table_name'
              component={Select}
              type='select'
              label='Choose your rated by items table'
              placeholder='Rated By Items table name'
              options={tables}
            />
            <Field
              name='ratings_table_name'
              component={Select}
              type='select'
              label='Choose your ratings table'
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
