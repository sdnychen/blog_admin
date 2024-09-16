import { api } from '@/api'

const articleApi = {
    /**
     * 文章列表
     */
    list: (params?: any) => api.get('/article/list', params),

    /**
     * 全部文章列表
     */
    allList: (params?: any) => api.get('/article/allList', params),

    /**
     * 文章回收站列表
     */
    recycleBinList: (params?: any) => api.get('/article/recycleBinList', params),

    /**
     * 获取文章详情
     */
    detail: (params?: any) => api.get('/article/detail', params),

    /**
     * 文章添加
     */
    add: (params?: any) => api.post('/article/add', params),

    /**
     * 文章编辑
     */
    edit: (params?: any) => api.put('/article/edit', params),

    /**
     * 文章状态
     */
    updateStatus: (params?: any) => api.put('/article/updateStatus', params),

    /**
     * 文章删恢复
     */
    deleteRecovery: (params?: any) => api.delete('/article/deleteRecovery', params),

    /**
     * 文章删恢复
     */
    delete: (params?: any) => api.delete('/article/delete', params)
}

export default articleApi
