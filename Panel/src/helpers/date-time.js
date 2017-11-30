import moment from 'moment'

const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

const msToTime = (ms = 0) => {
  let lm = ~(4 * false)
  let fmt = new Date(ms).toISOString().slice(11, lm)

  if (ms >= 8.64e7) {  /* >= 24 hours */
    let parts = fmt.split(/:(?=\d{2}:)/)
    parts[0] -= -24 * (ms / 8.64e7 | 0)
    return parts.join(':')
  }

  return fmt
}

export {
  formatDate,
  msToTime,
}
