// 用户检索
interface UserQueryParam extends QueryParam{
    username: string,
    mobile: string,
    email: string
}

// 用户表单
interface UserDataType {
    id?: string,
    username: string,
    mobile: string,
    email: string,
    avatar: string,
    password: string,
    checkPassword?: string,
    status?: number,
    createTime?: string,
    remark: string
}

// 状态修改
interface UserStatusUpdateParam extends IDParam {
    status: number
}

// 权限列表
interface AuthResponse extends IDParam {
    authName: string,
    remark: string
}

// 用户和用户组的更新权限
interface UpdateUserAuthParam extends IDParam {
    authList: Array<string>
}

// 更新用户的用户组
interface UpdateUserGroupParam extends IDParam {
    userGroupList: Array<string>
}

// 重置密码
interface ResetPasswordRequest extends IDParam  {
    newPassword: string
}

// 用户组检索
interface UserGroupQueryForm extends QueryParam{
    userGroupName: string
}

// 用户组表单
interface UserGroupDataType {
    id?: string,
    groupName: string,
    createTime?: string
    remark: string
}

// 更新用户组的用户
interface UpdateUserForUserGroupRequest extends IDParam {
    userId: string[]
}
