import { request } from "../index"

const authApi = {
    /**
     * 全部权限列表
     */
    getAllList: () => request.get("/auth/allList")
}

export default authApi
