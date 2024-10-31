// 文章评论查询参数
interface CommentArticleQueryParam extends QueryParam{
    observerName?: string,
    targetTitle?: string,
    content?: string,
    status: number,
    submitTime?: string
}

// 文章评论
interface CommentArticleDataType {
    id: string,
    observerName: string,
    targetTitle: string,
    content: string,
    submitTime: string
    remark: string,
    status: number
}

// 审核
interface CommentStatusUpdateParam extends IDParam {
    status: number
}