/* eslint-disable no-unused-vars */
type Resulve<T = any> = {
    success: boolean,
    code: number,
    msg: string,
    data: T
}

type authRequestType = {
    id: string,
    authName: string,
    remark: string
}

type userGroupRequestType = {
    id: string,
    groupName: string,
    createTime: string,
    remark: string
}

type userRequestType = {
    id: string,
    username: string,
    email: string,
    mobile: string,
    avatar: string,
    status: string,
    createTime: string,
    remark: string
}
