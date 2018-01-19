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
  let status = res.data.code
  if (status === 200) {  // 请求成功
  } else {    // 请求失败
    alert('失败请重试')
  }
  return res.data
}, function (err) {
  console.log(err)
  return Promise.reject(err)
})

export default ({ url, method = 'GET', type = 'json', data = {}, params = {} }) => axios({
  url,
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
