import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import IconArrowBack from 'react-icons/lib/md/arrow-back'
import FormContainer from '../containers/FormContainer'
import { ContainerHeader, HeaderMenu, HeaderMenuItem } from '../../../layouts/PageLayout/components'
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
        <ContainerHeader>
          <HeaderMenu>
            <div>
              <HeaderMenuItem
                href='/app/database'
              >
                <IconArrowBack/>
                {' '}
                Back
              </HeaderMenuItem>
            </div>
          </HeaderMenu>
          <h1>Create Database</h1>
        </ContainerHeader>
        <div className='page-content'>
          <FormContainer database={database}/>
        </div>
      </div>
    )
  }
}

export default CSSModules(AddDatabase, styles)
