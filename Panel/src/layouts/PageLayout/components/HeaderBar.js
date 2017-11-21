import React from 'react'
import PropTypes from 'prop-types'
import IconArrowBack from 'react-icons/lib/md/arrow-back'
import { ContainerHeader, HeaderMenu, HeaderMenuItem } from './'

class HeaderBar extends React.Component {
  render () {
    const { children, title, back } = this.props

    return (
      <ContainerHeader>
        <HeaderMenu>
          <div>
            {back && (
              <HeaderMenuItem
                href={back}
              >
                <IconArrowBack/>
                {' '}
                Back
              </HeaderMenuItem>
            )}
            {children}
          </div>
        </HeaderMenu>
        <h1>{title}</h1>
      </ContainerHeader>
    )
  }
}

HeaderBar.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  back: PropTypes.string,
}

export default HeaderBar
