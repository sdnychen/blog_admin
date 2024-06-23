import { request } from "../index"

const userApi = {
    /**
     * 用户列表
     */
    getUserList: (params: any) => request.get<responsePageData>("/user/list", params),

    /**
     * 用户添加
     */
    addUser: (params: any) => request.post("/user/add", params),

    /**
     * 用户添加
     */
    editUser: (params: any) => request.put("/user/edit", params),

    /**
     * 用户状态改变
     */
    updateStatus: (params: any) => request.put("/user/updateStatus", params),

    /**
     * 用户删除
     */
    deleteUser: (params: any) => request.delete("/user/delete", params),

    /**
     * 用户删除
     */
    userDetail: (params: any) => request.get("/user/detail", params)
}

export default userApi
