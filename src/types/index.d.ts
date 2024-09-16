// 环境变量
interface ImportMetaEnv {
    readonly VITE_BASE_URL: string;
    readonly VITE_REFRESH_TOKEN_STS: number;
    readonly VITE_OSS_BUCKET: string
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}

interface RouteMeta {
    title: string
}

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
// 登录返回数据
interface LoginInfo {
    userInfo: UserInfo
}

// 返回数据的结构（分页）
interface ResponsePageData<T = object> {
    list: T[],
    page: number,
    total: number
}

interface Result<T = object> {
    success: boolean,
    code: number,
    msg: string,
    data: T
}

interface StsRequest {
    accessKeyId: string,
    accessKeySecret: string,
    securityToken: string
}

interface QueryParam {
    page: number
}

interface IDParam {
    id: string
}
