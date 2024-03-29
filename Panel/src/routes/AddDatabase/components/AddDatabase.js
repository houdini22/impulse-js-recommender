import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import FormContainer from '../containers/FormContainer'
import { HeaderBar } from 'layouts/PageLayout/components'
import styles from './AddDatabase.module.scss'

export class AddDatabase extends React.Component {
  static propTypes = {
    databases: PropTypes.object.isRequired,
    routeParams: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      database: {}
    }
  }

  componentDidMount () {
    if (this.props.routeParams.id) {
      const database = this.props.databases.databases.filter((db) => {
        return db.id === Number(this.props.routeParams.id)
      })[0]
      if (database) {
        this.setState({ database })
      }
    }
  }

  render () {
    const { database } = this.state

    return (
      <div>
        <HeaderBar
          title='Create Database'
          back='/app/database'
        />
        <div className='page-content'>
          <FormContainer database={database} />
        </div>
      </div>
    )
  }
}

export default CSSModules(AddDatabase, styles)
