import { api } from '@/api'

const articleSortApi = {
    /**
     * 文章分类列表
     */
    list: (params: articleTagSortQueryParam) => api.get<ResponsePageData<articleSortDataType>>('/articleSort/list', params),

    /**
     * 全部文章分类列表
     */
    allList: (params?: articleTagSortQueryParam) => api.get<articleSortDataType[]>('/articleSort/allList', params),

    /**
     * 获取文章详情
     */
    detail: (params: IDParam) => api.get<articleSortDataType>('/articleSort/detail', params),

    /**
     * 文章分类添加
     */
    add: (params: articleSortDataType) => api.post<undefined>('/articleSort/add', params),

    /**
     * 文章分类编辑
     */
    edit: (params: articleSortDataType) => api.put<undefined>('/articleSort/edit', params),

    /**
     * 文章分类删除
     */
    delete: (params: IDParam) => api.delete('/articleSort/delete', params)
}

export default articleSortApi
