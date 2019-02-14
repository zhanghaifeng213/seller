import http from '@/libs/httpRequest'

const addOrder = (data) => {
  return http({
    url: http.adornUrl('/order/add'),
    method: 'post',
    data
  })
}
const list = (data) => {
  return http({
    url: http.adornUrl('/order/list'),
    method: 'post',
    data
  })
}
export { addOrder, list }