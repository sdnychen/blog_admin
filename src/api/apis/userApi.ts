import { post } from "../index"

const userApi = {
  login: (params: any) => {
    return post("/user/login", params)
  }
}

export default userApi
