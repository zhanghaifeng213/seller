
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
    method: 'get'
  })
}

export const inquire = (data) => {
  return http({
    url: http.adornUrl('/user/inquire'),
    method: 'get',
    data: data
  })
}

export const userReg = (data) => {
  return http({
    url: http.adornUrl('user/reg'),
    method: 'post',
    data: data
  })
}

export const userUpdate = (data) => {
  return http({
    url: http.adornUrl('user/update'),
    method: 'post',
    data: data
  })
}
