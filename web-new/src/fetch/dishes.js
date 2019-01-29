import http from '@/libs/httpRequest'

const dishes = () => {
  return http({
    url: http.adornUrl('/menu/allList'),
    method: 'get'
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
    url: http.adornUrl('/menu/add'),
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

export {dishes, disheAdd, types, disheDel}
