/**
 * Api 文档
 * url: http://180.168.63.153:8011/cloud/doc/api.doc
 */
import Axios from 'axios'
import Qs from 'qs'

Axios.defaults.baseURL = 'http://180.168.63.152:8889/cloud'
Axios.defaults.timeout = 10000
Axios.defaults.transformRequest = data => data ? Qs.stringify(JSON.parse(data)) : data
// Add a request interceptor
Axios.interceptors.request.use(config => {
  if (!config.params) config.params = {}
  config.params.isDebugMode = true
  config.params.uid = '61a5895a-32cb-4534-9fed-e0e88f9e62e5'

  // 客户端请求时需要
  if (config.url.indexOf('clientI!') > 0)
    config.params.imei = navigator.userAgent

  return config
}, error => Promise.reject(error))

// Add a response interceptor
Axios.interceptors.response.use(response => {
  const status = parseInt(response.status)

  if (status === 401) {
    // 未授权
    window.location.href = `${response.data.loginurl}?url=${location.href}`

    return
  } else if (status !== 200) {
    App.pop()
  }

  return response
}, error => Promise.reject(error))

export default Axios
