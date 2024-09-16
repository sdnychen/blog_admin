import { api } from '@/api'

const articleSortApi = {
    /**
     * 文章分类列表
     */
    list: (params?: any) => api.get('/articleSort/list', params),

    /**
     * 全部文章分类列表
     */
    allList: (params?: any) => api.get('/articleSort/allList', params),

    /**
     * 获取文章详情
     */
    detail: (params?: any) => api.get('/articleSort/detail', params),

    /**
     * 文章分类添加
     */
    add: (params?: any) => api.post('/articleSort/add', params),

    /**
     * 文章分类编辑
     */
    edit: (params?: any) => api.put('/articleSort/edit', params),

    /**
     * 文章分类删除
     */
    delete: (params?: any) => api.delete('/articleSort/delete', params)
}

export default articleSortApi
