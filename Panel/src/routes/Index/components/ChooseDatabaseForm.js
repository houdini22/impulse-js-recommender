import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Field } from 'redux-form'
import { Button } from 'reactstrap'
import { Select } from '../../../components'
import styles from './Index.module.scss'

export class ChooseDatabaseForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    getDatabases: PropTypes.func.isRequired,
    snapshots: PropTypes.object.isRequired,
    databases: PropTypes.object.isRequired,
  }

  componentDidMount () {
    const { getDatabases } = this.props
    getDatabases()
  }

  render () {
    const {
      databases: { databases },
      handleSubmit,
    } = this.props

    return (
      <div>
        <h6>Choose Database</h6>
        {databases && (
          <form onSubmit={handleSubmit}>
            <Field
              name='database_id'
              component={Select}
              type='select'
              options={() => {
                return databases.map((database) => {
                  return [database.id, database.name]
                })
              }}
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

export default CSSModules(ChooseDatabaseForm, styles)
