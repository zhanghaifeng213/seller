const API_DEV = 'http://116.62.147.91:3030'
// const API_DEV = 'http://127.0.0.1:3030';
// const API_DEV = 'http://192.168.0.198:3030';

const apis = {
  test: `${API_DEV}/`,
  getTableList: `${API_DEV}/table/list`,
  categoryList: `${API_DEV}/category/list`,
  categoryAdd: `${API_DEV}/category/add`,
  categoryDel: `${API_DEV}/category/delete`,
  categoryUpdate: `${API_DEV}/category/update`,
  menuList: `${API_DEV}/menu/getlist`,
  menuAdd: `${API_DEV}/menu/add`,
  menuUpdate: `${API_DEV}/menu/update`,
  menuDelete: `${API_DEV}/menu/delete`,
  imgUplod: `${API_DEV}/image/upload`,
  getListByCid: `${API_DEV}/menu/getlist`,
  login: `${API_DEV}/user/login`,
  reg: `${API_DEV}/user/reg`,
}

export default apis;