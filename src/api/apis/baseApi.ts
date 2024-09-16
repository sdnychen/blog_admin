import { api } from '@/api'

const baseApi = {
    /**
     * 获取验证码
     */
    getVerifyImg: () => {
        return api.get<string>('/verifyCode')
    },

    /**
     * 登录
     */
    login: (params: LoginForm) => {
        return api.post<LoginInfo>('/login', params)
    },

    /**
     * 登录检测
     */
    check: () => {
        return api.post<LoginInfo>('/check')
    },

    /**
     * sts授权
     */
    sts: () => {
        return api.get<StsRequest>('/sts')
    }
}

export default baseApi
