// 用户检索
interface UserQueryForm extends QueryFormBase{
    username: string,
    mobile: string,
    email: string
}

// 用户表单
interface UserAddEditForm {
    username: string,
    mobile: string,
    email: string,
    avatar: string,
    password: string,
    checkPassword: string | undefined,
    remark: string
}

interface UserTableDataType {
    id: string,
    username: string,
    email: string,
    mobile: string,
    avatar: string,
    status: number,
    createTime: string
    remark: string
}

// 状态修改
interface UserStatusUpdateRequest {
    id: string,
    status: number
}

// 用户删除
interface UserDeleteRequest {
    id: string
}

// 用户详情
interface UserDetailRequest {
    id: string
}

// 用户权限
interface UserAuthRequest {
    id: string
}

// 权限列表
interface AuthResponse {
    id: string,
    authName: string,
    remark: string
}

// 更新用户权限
interface UpdateUserAuthRequest {
    id: string,
    authList: Array<string>
}

// 更新用户组
interface UpdateUserGroupRequest {
    id: string,
    userGroupList: Array<string>
}

// 获取用户在用户组
interface UserGroupRequest {
    id: string
}

// 重置密码
interface ResetPasswordRequest {
    id: string,
    newPassword: string
}

// 获取用户组中的用户
interface UserOfUserGroup {
    id: string,
}

// 用户组检索
interface UserGroupQueryForm extends QueryFormBase{
    userGroupName: string
}

// 用户组表单
interface UserGroupAddEditForm {
    groupName: string,
    remark: string
}

// 用户组
interface UserGroupTableDataType {
    id: string,
    groupName: string,
    createTime: string
    remark: string
}
