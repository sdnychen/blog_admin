import { request } from "@/api"

const userApi = {
    /**
     * 用户列表
     */
    getUserList: (params: any) => request.get<responsePageData>("/user/list", params),

    /**
     * 全部用户列表
     */
    getAllUserList: (params?: any) => request.get("/user/allList", params),

    /**
     * 用户添加
     */
    addUser: (params: any) => request.post("/user/add", params),

    /**
     * 用户编辑
     */
    editUser: (params: any) => request.put("/user/edit", params),

    /**
     * 用户启用禁用状态改变
     */
    updateStatus: (params: any) => request.put("/user/updateStatus", params),

    /**
     * 用户删除
     */
    deleteUser: (params: any) => request.delete("/user/delete", params),

    /**
     * 用户详情
     */
    getUserDetail: (params: any) => request.get("/user/detail", params),

    /**
     * 获取用户权限
     */
    getUserAuthList: (params: any) => request.get("/user/auth", params),

    /**
     * 更新用户权限
     */
    updateUserAuthList: (params: any) => request.post("/user/updateAuth", params),

    /**
     * 获取用户加入的用户
     */
    getUserInUserGroup: (params: any) => request.get("/user/userInUserGroup", params),

    /**
     * 更新用户的用户组
     */
    updateUserGroupList: (params: any) => request.post("/user/updateUserGroup", params),

    /**
     * 重置密码
     */
    resetPassword: (params: any) => request.post("/user/resetPassword", params)
}

export default userApi
