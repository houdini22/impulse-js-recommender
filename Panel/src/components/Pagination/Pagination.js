import React from 'react'
import ReactPaginate from 'react-paginate'
import PropTypes from 'prop-types'
import styles from './Pagination.module.scss'

class Pagination extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPage: 0
    }
  }

  render () {
    const { onPageChange, pageCount, limit, totalItems } = this.props
    const { currentPage } = this.state

    return (
      <div>
        <div className={styles['total-items']}>
          {totalItems > 0 && (
            <span>
              Showing {currentPage * limit + 1}{' '}
              to {Math.min(currentPage * limit + limit, totalItems)}{' '}
              of {totalItems}{' '}
              entries.
            </span>
          )}
          {totalItems === 0 && (
            <span>
              No entries
            </span>
          )}
        </div>
        {pageCount > 1 && (
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={({ selected }) => {
              this.setState({
                currentPage: selected
              })
              onPageChange({ selected })
            }}
            containerClassName={styles.pagination}
            subContainerClassName={styles.pages}
            activeClassName={styles.active}
            disabledClassName={styles.disabled}
          />
        )}
      </div>
    )
  }
}

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  limit: PropTypes.number,
  totalItems: PropTypes.number,
}

export default Pagination
