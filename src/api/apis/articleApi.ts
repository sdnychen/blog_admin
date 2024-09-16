import { api } from '@/api'

const articleApi = {
    /**
     * 文章列表
     */
    list: (params: ArticleQueryParam) => api.get<ResponsePageData<ArticleDataType>>('/article/list', params),

    /**
     * 全部文章列表
     */
    allList: (params?: ArticleQueryParam) => api.get<ArticleDataType[]>('/article/allList', params),

    /**
     * 文章回收站列表
     */
    recycleBinList: (params: articleRecycleBinQueryParam) => api.get<ResponsePageData<ArticleDataType>>('/article/recycleBinList', params),

    /**
     * 获取文章详情
     */
    detail: (params: IDParam) => api.get<ArticleDataType>('/article/detail', params),

    /**
     * 文章添加
     */
    add: (params: ArticleDataType) => api.post<undefined>('/article/add', params),

    /**
     * 文章编辑
     */
    edit: (params: ArticleDataType) => api.put<undefined>('/article/edit', params),

    /**
     * 文章状态
     */
    updateStatus: (params: ArticleStatusUpdateParam) => api.put<undefined>('/article/updateStatus', params),

    /**
     * 文章删除恢复
     */
    deleteRecovery: (params: ArticleDeleteRecoveryParam) => api.delete<undefined>('/article/deleteRecovery', params),

    /**
     * 文章删恢复
     */
    delete: (params: IDParam) => api.delete<undefined>('/article/delete', params)
}

export default articleApi
