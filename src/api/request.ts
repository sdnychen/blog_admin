import axios from "axios"
import { createDiscreteApi } from "naive-ui"

const { message } = createDiscreteApi(["message"])

interface Resulve {
  success: boolean,
  code: number,
  msg: string,
  data: any
}

const service = axios.create({
  baseURL: "http://localhost:8080/api/",
  timeout: 20000,
  withCredentials: true // 表示跨域请求时是否需要使用凭证
})

// 请求拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error)
})

// 响应拦截器
service.interceptors.response.use(response => {

  // 消息弹窗
  const resulve: Resulve = response.data
  if (resulve.success && resulve.msg) {
    message.success(resulve.msg)
  } else if (resulve.code === 5000 && resulve.msg) {
    message.error(resulve.msg)
  } else if (resulve.msg) {
    message.warning(resulve.msg)
  }

  return response.data
}, error => {
  console.log(error)
})

export default service
