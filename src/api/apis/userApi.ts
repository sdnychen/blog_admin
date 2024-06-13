import { request } from "../index"

const userApi = {
    /**
     * 用户列表
     */
    getUserList: (params: any) => {
        return request.get<responsePageData>("/user/list", params)
    }
}

export default userApi
