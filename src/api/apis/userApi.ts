import { request } from "../index"

const userApi = {
  /**
   * 获取验证码
   */
  getVerifyImg: () => {
    return request.get<string>("/user/verifyCode")
  },

  /**
   * 登录
   */
  login: (params: any) => {
    return request.post("/user/login", params)
  }
}

export default userApi
