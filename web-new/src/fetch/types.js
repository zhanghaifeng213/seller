import http from '@/libs/httpRequest'

export const getTypeInfo = () => {
  return http({
    url: http.adornUrl('/category/list'),
    method: 'get'
  })
}

export const addTypesList = (data) => {
  return http({
    url: http.adornUrl('/category/add'),
    method: 'post',
    data: data
  })
}

export const deleteType = (data) => {
  return http({
    url: http.adornUrl('/category/delete'),
    method: 'post',
    data: data
  })
}

export const updataType = (data) => {
  return http({
    url: http.adornUrl('/category/update'),
    method: 'post',
    data: data
  })
}
