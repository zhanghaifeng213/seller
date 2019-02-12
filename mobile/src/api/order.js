import http from '@/libs/httpRequest'

const addOrder = (data) => {
  return http({
    url: http.adornUrl('/order/add'),
    method: 'post',
    data
  })
}
export const list = (id) => {
  return http({
    url: http.adornUrl('/order/list?id=' + id),
    method: 'get'
  })
}
export { addOrder }