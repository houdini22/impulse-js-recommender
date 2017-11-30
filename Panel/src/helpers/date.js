import moment from 'moment'

const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

export {
  formatDate,
}
