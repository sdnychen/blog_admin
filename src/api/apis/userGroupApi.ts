import { request } from "../index"

const userGroupApi = {
    /**
     * 用户组列表
     */
    getUserGroupList: (params: any) => request.get<responsePageData>("/userGroup/list", params),

    /**
     * 用户组添加
     */
    addUserGroup: (params: any) => request.post("/userGroup/add", params),

    /**
     * 用户组编辑
     */
    editUserGroup: (params: any) => request.put("/userGroup/edit", params),

    /**
     * 用户组删除
     */
    deleteUserGroup: (params: any) => request.delete("/userGroup/delete", params),

    /**
     * 用户组删除
     */
    getUserGroupDetail: (params: any) => request.get("/userGroup/detail", params),

    /**
     * 获取用户组权限
     */
    getUserGroupAuthList: (params: any) => request.get("/userGroup/auth", params),

    /**
     * 更新用户组权限
     */
    updateUserGroupAuthList: (params: any) => request.post("/userGroup/updateAuth", params)

}

export default userGroupApi
