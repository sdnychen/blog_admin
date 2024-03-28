import axios from "axios"

const service = axios.create({
  baseURL: "http://localhost:8080/api/",
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  return response.data.data
}, error => {
  console.log(error)
})

export default service
