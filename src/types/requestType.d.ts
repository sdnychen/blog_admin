interface ArticleRequestType {
    id: string,
    title: string,
    alias: string,
    img: string,
    status: number,
    createTime: string
    publishTime: string,
    deleteTime: string,
    remark: string
}

// 文章标签
interface articleTagRequestType {
    id: string,
    name: string,
    color: string,
    createTime: string
    remark: string
}

// 文章分类
interface articleSortRequestType {
    id: string,
    name: string,
    img: string,
    createTime: string
    remark: string
}
