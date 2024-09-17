// 文章查询
interface ArticleQueryParam extends QueryParam {
    title: string,
    status: number | null,
    publishTime?: string[] | null,
    updateTime?: string[] | null,
    createTime?: string[] | null,
    startPublishTime?: string,
    endPublishTime?: string,
    startUpdateTime?: string,
    endUpdateTime?: string,
    startCreateTime?: string,
    endCreateTime?: string
}
// 文章数据
interface ArticleDataType {
    id?: string,
    title: string,
    alias: string,
    img: string,
    status: number,
    createTime?: string
    publishTime?: string,
    updateTime?: string,
    deleteTime?: string,
    remark: string,
    content: string,
    intro: string,
    tagList: Array<string> | null,
    sort: string | null,
}
// 状态修改
interface ArticleStatusUpdateParam extends IDParam {
    status: number
}
// 删除恢复
interface ArticleDeleteRecoveryParam extends IDParam {
    deleted: number
}

// 文章标签/分类查询
interface articleTagSortQueryParam extends QueryParam{
    page?: number,
    name: string
}
// 文章标签
interface articleTagDataType {
    id?: string,
    name: string,
    color: string,
    createTime?: string
    remark: string
}

// 文章分类
interface articleSortDataType {
    id?: string,
    name: string,
    img: string,
    createTime?: string
    remark: string
}

// 回收站查询
interface articleRecycleBinQueryParam extends QueryParam {
    title: string,
}
