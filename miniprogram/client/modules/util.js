// 时间格式化
const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 数字格式化
const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime,
  formatNumber
}