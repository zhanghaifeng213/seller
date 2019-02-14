import http from '@/libs/httpRequest'

const tableNumber = () => {
    return http({
        url: http.adornUrl('/table/list'),
        method: 'get'
    })
}
const tableAdd = (data) => {
    return http({
        url: http.adornUrl('/table/add'),
        method: 'post',
        data: data
    })
}
const tableDel = (data) => {
    return http({
        url: http.adornUrl('/table/delete'),
        method: 'post',
        data: data
    })
}
export { tableNumber, tableAdd, tableDel }