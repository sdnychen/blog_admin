import { api } from '@/api'

const articleTagApi = {
    /**
     * 文章标签列表
     */
    list: (params?: any) => api.get('/articleTag/list', params),

    /**
     * 全部文章标签列表
     */
    allList: (params?: any) => api.get('/articleTag/allList', params),

    /**
     * 获取文章详情
     */
    detail: (params?: any) => api.get('/articleTag/detail', params),

    /**
     * 文章标签添加
     */
    add: (params?: any) => api.post('/articleTag/add', params),

    /**
     * 文章标签编辑
     */
    edit: (params?: any) => api.put('/articleTag/edit', params),

    /**
     * 文章标签删除
     */
    delete: (params?: any) => api.delete('/articleTag/delete', params)
}

export default articleTagApi
