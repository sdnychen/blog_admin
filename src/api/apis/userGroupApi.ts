import { api } from '@/api'

const userGroupApi = {
    /**
     * 用户组列表
     */
    getUserGroupList: (params?: UserGroupQueryForm) => api.get<ResponsePageData<UserGroupDataType>>('/userGroup/list', params),

    /**
     * 全部用户组列表
     */
    getAllUserGroupList: (params?: UserGroupQueryForm) => api.get<UserGroupDataType[]>('/userGroup/allList', params),

    /**
     * 用户组添加
     */
    addUserGroup: (params: UserGroupDataType) => api.post<undefined>('/userGroup/add', params),

    /**
     * 用户组编辑
     */
    editUserGroup: (params: UserGroupDataType) => api.put<undefined>('/userGroup/edit', params),

    /**
     * 用户组删除
     */
    deleteUserGroup: (params: IDParam) => api.delete<undefined>('/userGroup/delete', params),

    /**
     * 用户组详情
     */
    getUserGroupDetail: (params: IDParam) => api.get<UserGroupDataType>('/userGroup/detail', params),

    /**
     * 获取用户组权限
     */
    getUserGroupAuthList: (params: IDParam) => api.get<AuthResponse[]>('/userGroup/auth', params),

    /**
     * 更新用户组权限
     */
    updateUserGroupAuthList: (params: UpdateUserAuthParam) => api.post<undefined>('/userGroup/updateAuth', params),

    /**
     * 获取用户所在用户组
     */
    getUserGroupByUser: (params: IDParam) => api.get<UserGroupDataType[]>('/userGroup/userGroupbyUser', params),

    /**
     * 更新用户组的用户
     */
    updateUserList: (params: UpdateUserForUserGroupRequest) => api.post<undefined>('/userGroup/updateUser', params)

}

export default userGroupApi
