import { get, post } from "../index"

const userApi = {
  getVerifyImg: () => {
    return get("/user/verifyCode")
  },
  login: (params: any) => {
    return post("/user/login", params)
  }
}

export default userApi
