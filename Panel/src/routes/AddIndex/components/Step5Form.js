import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Field } from 'redux-form'
import { Button, FormGroup, Label } from 'reactstrap'
import { TextField } from '../../../components/index'
import styles from '../../Index/components/Index.module.scss'

export class SnapshotsView extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    snapshots: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {
      snapshots: { rating_fields },
      handleSubmit
    } = this.props

    return (
      <div>
        <h6>Choose your Index Name to recognize it on the list.</h6>
        {rating_fields && (
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <div>
                <Field
                  name='name'
                  component={TextField}
                  type='text'
                  placeholder='Index Name'
                />
              </div>
            </FormGroup>
            <div className='text-right'>
              <Button type='submit' color='success'>Save</Button>
            </div>
          </form>
        )}
      </div>
    )
  }
}

export default CSSModules(SnapshotsView, styles)
