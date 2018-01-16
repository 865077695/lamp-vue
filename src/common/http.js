/**
 * axios
 * @param {url}
 * @param {method, type, data, params}
 * data为post请求数据，params为get请求数据
 */
import axios from 'axios'
import config from '../config'

// 拦截器做错误信息处理
axios.interceptors.response.use(function (res) {
  // 处理状态码
  // let state = res.data.code
  // console.log(code[`_${state}`])
  if (res.data.invalidParams) {
    console.log(res.data.invalidParams)
  }
  return res.data
}, function (err) {
  console.log(err)
  return Promise.reject(err)
})

export default ({ url, method = 'GET', type = 'json', data = {}, params = {} }) => axios({
  url: 'https://easy-mock.com/mock/5a4de5cfd15d983e1a86e4a9/anjian/user/logout',
  baseURL: config.baseURL,
  method,
  responseType: type,
  data,
  params,
  timeout: 3000,
  headers: {
    'Content-type': 'application/json'
  }
})
