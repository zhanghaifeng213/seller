
import http from '@/libs/httpRequest'
import qs from 'qs'
export const clist = (params) => {
  return http({
    url: http.adornUrl('/order/clist?') + qs.stringify(params),
    method: 'get'
  })
}
export const update = (data) => {
  return http({
    url: http.adornUrl('/order/update'),
    method: 'post',
    data
  })
}


