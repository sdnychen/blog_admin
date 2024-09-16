import { api } from '@/api'

const articleTagApi = {
    /**
     * 文章标签列表
     */
    list: (params: articleTagQueryParam) => api.get<ResponsePageData<articleTagDataType>>('/articleTag/list', params),

    /**
     * 全部文章标签列表
     */
    allList: (params?: articleTagQueryParam) => api.get<articleTagDataType[]>('/articleTag/allList', params),

    /**
     * 获取文章详情
     */
    detail: (params: IDParam) => api.get<articleTagDataType>('/articleTag/detail', params),

    /**
     * 文章标签添加
     */
    add: (params: articleTagDataType) => api.post<undefined>('/articleTag/add', params),

    /**
     * 文章标签编辑
     */
    edit: (params: articleTagDataType) => api.put<undefined>('/articleTag/edit', params),

    /**
     * 文章标签删除
     */
    delete: (params: IDParam) => api.delete<undefined>('/articleTag/delete', params)
}

export default articleTagApi
