import http from '@/libs/httpRequest'

const dishes = () => {
  return http({
    url: http.adornUrl('/menu/list'),
    method: 'get',
  })
}

export { dishes }
