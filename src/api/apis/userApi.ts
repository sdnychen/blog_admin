import { api } from '@/api'

const userApi = {
    /**
     * 用户列表
     */
    getUserList: (params: UserQueryParam) => api.get<ResponsePageData<UserDataType>>('/user/list', params),

    /**
     * 全部用户列表
     */
    getAllUserList: (params?: UserQueryParam) => api.get<UserDataType[]>('/user/allList', params),

    /**
     * 用户添加
     */
    addUser: (params: UserDataType) => api.post<undefined>('/user/add', params),

    /**
     * 用户编辑
     */
    editUser: (params: UserDataType) => api.put<undefined>('/user/edit', params),

    /**
     * 用户启用禁用状态改变
     */
    updateStatus: (params: UserStatusUpdateParam) => api.put<undefined>('/user/updateStatus', params),

    /**
     * 用户删除
     */
    deleteUser: (params: IDParam) => api.delete<undefined>('/user/delete', params),

    /**
     * 用户详情
     */
    getUserDetail: (params: IDParam) => api.get<UserDataType>('/user/detail', params),

    /**
     * 获取用户权限
     */
    getUserAuthList: (params: IDParam) => api.get<AuthResponse[]>('/user/auth', params),

    /**
     * 更新用户权限
     */
    updateUserAuthList: (params: UpdateUserAuthParam) => api.post<undefined>('/user/updateAuth', params),

    /**
     * 获取用户组中的用户
     */
    getUserInUserGroup: (params: IDParam) => api.get<UserDataType[]>('/user/userInUserGroup', params),

    /**
     * 更新用户的用户组
     */
    updateUserGroupList: (params: UpdateUserGroupParam) => api.post<undefined>('/user/updateUserGroup', params),

    /**
     * 重置密码
     */
    resetPassword: (params: ResetPasswordRequest) => api.post<undefined>('/user/resetPassword', params)
}

export default userApi
