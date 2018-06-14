/**
 * axios
 * @param {url}
 * @param {method, type, data, params}
 * data为post请求数据，params为get请求数据
 */
import iView from 'iview'
import axios from 'axios'
import config from '../config'
import router from '@/router'

// 拦截器做错误信息处理
axios.interceptors.response.use(function (res) {
  // 处理状态码
  let status = res.data.code
  if (status === 5000) {  // 未登录
    router.push({ path: '/sign' })
  } else if (status === 500) {  // 服务器错误
    iView.Message.error('服务器错误，请联系管理员')
  }
  return res.data
}, function (err) {
  iView.Message.error('请求超时，请重试')
  return Promise.reject(err)
})

export default ({ url, method = 'GET', type = 'json', data = {}, params = {} }) => axios({
  url,
  baseURL,
  method,
  responseType: type,
  data,
  params,
  timeout: 6000,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json'
  }
})
