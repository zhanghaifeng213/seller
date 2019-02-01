
import http from '@/libs/httpRequest'

// 获取系统配置信息
export const getSystemInfo = () => {
  return http({
    url: http.adornUrl('/system'),
    method: 'get'
  })
}
