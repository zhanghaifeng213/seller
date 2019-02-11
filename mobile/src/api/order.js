import http from '@/libs/httpRequest'

const addOrder = (data) => {
  return http({
    url: http.adornUrl('/order/add'),
    method: 'post',
    data
  })
}

export { addOrder }