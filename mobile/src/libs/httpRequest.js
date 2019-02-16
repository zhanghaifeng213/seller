import axios from 'axios'
// 生产环境和开发环境的地址切换
const root = process.env.API_ROOT

const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  'Content-Type': 'application/json; charset=utf-8'
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token')
  config.headers.common['Authorization'] = 'Bearer ' + token
  return config
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = actionName => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return (
    // (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY
    //   ? '/proxyApi/'
    //   : window.SITE_CONFIG.baseUrl) + actionName
    (process.env.NODE_ENV !== 'production' ? '/proxyApi/' : root) + actionName
  )
}

export default http
