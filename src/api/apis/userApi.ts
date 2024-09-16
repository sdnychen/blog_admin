import { api } from '@/api'

const userApi = {
    /**
     * 用户列表
     */
    getUserList: (params: UserQueryForm) => api.get<ResponsePageData<UserTableDataType>>('/user/list', params),

    /**
     * 全部用户列表
     */
    getAllUserList: (params?: UserQueryForm) => api.get<UserTableDataType[]>('/user/allList', params),

    /**
     * 用户添加
     */
    addUser: (params: UserAddEditForm) => api.post<undefined>('/user/add', params),

    /**
     * 用户编辑
     */
    editUser: (params: UserTableDataType) => api.put<undefined>('/user/edit', params),

    /**
     * 用户启用禁用状态改变
     */
    updateStatus: (params: UserStatusUpdateRequest) => api.put<undefined>('/user/updateStatus', params),

    /**
     * 用户删除
     */
    deleteUser: (params: UserDeleteRequest) => api.delete<undefined>('/user/delete', params),

    /**
     * 用户详情
     */
    getUserDetail: (params: UserDetailRequest) => api.get<UserAddEditForm>('/user/detail', params),

    /**
     * 获取用户权限
     */
    getUserAuthList: (params: UserAuthRequest) => api.get<AuthResponse[]>('/user/auth', params),

    /**
     * 更新用户权限
     */
    updateUserAuthList: (params: UpdateUserAuthRequest) => api.post<undefined>('/user/updateAuth', params),

    /**
     * 获取用户组中的用户
     */
    getUserInUserGroup: (params: UserOfUserGroup) => api.get<UserTableDataType[]>('/user/userInUserGroup', params),

    /**
     * 更新用户的用户组
     */
    updateUserGroupList: (params: UpdateUserGroupRequest) => api.post<undefined>('/user/updateUserGroup', params),

    /**
     * 重置密码
     */
    resetPassword: (params: ResetPasswordRequest) => api.post<undefined>('/user/resetPassword', params)
}

export default userApi
