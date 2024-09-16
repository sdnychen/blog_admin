import { api } from '@/api'

const userGroupApi = {
    /**
     * 用户组列表
     */
    getUserGroupList: (params?: UserGroupQueryForm) => api.get<ResponsePageData<UserGroupTableDataType>>('/userGroup/list', params),

    /**
     * 全部用户组列表
     */
    getAllUserGroupList: (params?: UserGroupQueryForm) => api.get<UserGroupTableDataType[]>('/userGroup/allList', params),

    /**
     * 用户组添加
     */
    addUserGroup: (params: UserGroupAddEditForm) => api.post<undefined>('/userGroup/add', params),

    /**
     * 用户组编辑
     */
    editUserGroup: (params: any) => api.put('/userGroup/edit', params),

    /**
     * 用户组删除
     */
    deleteUserGroup: (params: any) => api.delete('/userGroup/delete', params),

    /**
     * 用户组详情
     */
    getUserGroupDetail: (params: any) => api.get('/userGroup/detail', params),

    /**
     * 获取用户组权限
     */
    getUserGroupAuthList: (params: any) => api.get<AuthResponse[]>('/userGroup/auth', params),

    /**
     * 更新用户组权限
     */
    updateUserGroupAuthList: (params: any) => api.post('/userGroup/updateAuth', params),

    /**
     * 获取用户所在用户组
     */
    getUserGroupByUser: (params: UserGroupRequest) => api.get<UserGroupTableDataType[]>('/userGroup/userGroupbyUser', params),

    /**
     * 更新用户组的用户
     */
    updateUserList: (params: any) => api.post('/userGroup/updateUser', params)

}

export default userGroupApi
