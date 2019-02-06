import http from '@/libs/httpRequest'

const dishes = (params) => {
  return http({
    url: http.adornUrl('/menu/allList'),
    method: 'get',
    params: params
  })
}

const dishesByCID = (params) => {
  return http({
    url: http.adornUrl('/menu/getListByCid'),
    method: 'get',
    params: params
  })
}
const disheAdd = (data) => {
  return http({
    url: http.adornUrl('/menu/add'),
    method: 'post',
    data: data
  })
}

const disheDel = (data) => {
  return http({
    url: http.adornUrl('/menu/delete'),
    method: 'post',
    data: data
  })
}

const disheEdit = (data) => {
  return http({
    url: http.adornUrl('/menu/update'),
    method: 'post',
    data: data
  })
}

const types = () => {
  return http({
    url: http.adornUrl('/category/list'),
    method: 'get'
  })
}

export {dishes, disheAdd, types, disheDel, disheEdit, dishesByCID}
