import { request } from "../index"

const baseApi = {
    /**
     * 获取验证码
     */
    getVerifyImg: () => {
        return request.get<string>("/verifyCode")
    },

    /**
     * 登录
     */
    login: (params: any) => {
        return request.post("/login", params)
    },

    /**
     * 登录
     */
    check: () => {
        return request.post("/check")
    }
}

export default baseApi
