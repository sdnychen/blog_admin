/* eslint-disable no-unused-vars */
type Resulve<T = any> = {
    success: boolean,
    code: number,
    msg: string,
    data: T
}

// 权限
type authRequestType = {
    id: string,
    authName: string,
    remark: string
}

// 用户组
type userGroupRequestType = {
    id: string,
    groupName: string,
    createTime: string,
    remark: string
}

// 用户
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

type ArticleRequestType = {
    id: string,
    title: string,
    alias: string,
    img: string,
    status: number,
    createTime: string
    publishTime: string | undefined,
    remark: string
}

// 文章标签
type articleTagRequestType = {
    id: string,
    name: string,
    color: string,
    createTime: string
    remark: string
}

// 文章分类
type articleSortRequestType = {
    id: string,
    name: string,
    img: string,
    createTime: string
    remark: string
}
