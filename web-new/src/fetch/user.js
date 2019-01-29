
import http from '@/libs/httpRequest'
export const login = (data) => {
  return http({
    url: http.adornUrl('/user/login'),
    method: 'post',
    data: data
  })
}

export const info = () => {
  return http({
    url: http.adornUrl('/user/info'),
    method: 'get',
  })
}


