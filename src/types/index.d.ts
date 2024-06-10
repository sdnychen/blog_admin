/* eslint-disable no-unused-vars */
// 登录表单
interface LoginForm {
    username: string,
    password: string,
    verify: string | undefined
}

// 登录用户信息
interface UserInfo {
    id: string,
    username: string,
    mobile: string,
    avatar: string,
    email: string,
    auth: string
}
