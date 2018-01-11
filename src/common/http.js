import axios from 'axios'
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  console.log(error)
  return Promise.reject(error)
})

export const http = axios({
  url: 'https://easy-mock.com/mock/5a4de5cfd15d983e1a86e4a9/anjian/user/logout'
})
