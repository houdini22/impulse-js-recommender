import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Field } from 'redux-form'
import { Button, FormGroup, Label } from 'reactstrap'
import { StateButton, Select } from '../../../components/index'
import styles from '../../Index/components/Index.module.scss'

export class SnapshotsView extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    snapshots: PropTypes.object.isRequired,
    getRatingFields: PropTypes.func.isRequired,
  }

  componentWillMount () {
    const { snapshots: { newSnapshot: { ratingsTableName, databaseId } }, getRatingFields } = this.props

    getRatingFields(ratingsTableName, databaseId)
  }

  render () {
    const {
      snapshots: { rating_fields },
      handleSubmit
    } = this.props

    return (
      <div>
        <h6>Choose your RATINGS relation columns.</h6>
        {rating_fields && (
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="field_item_id">Item ID field</Label>
              <Field
                name='ratingsFieldItemId'
                component={Select}
                type='select'
                placeholder='RATED ITEM column relation'
                options={rating_fields}
              />
            </FormGroup>
            <FormGroup>
              <Label for="field_item_id">Rated By ID field</Label>
              <Field
                name='ratingsFieldCategoryId'
                component={Select}
                type='select'
                placeholder='RATED BY ITEM column relation'
                options={rating_fields}
              />
            </FormGroup>
            <FormGroup>
              <Label for="field_item_id">Rating value</Label>
              <Field
                name='ratingsFieldValue'
                component={Select}
                type='select'
                placeholder='RATING VALUE column relation'
                options={rating_fields}
              />
            </FormGroup>
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
