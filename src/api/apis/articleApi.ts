import { request } from "@/api"

const articleApi = {
    /**
     * 文章列表
     */
    list: (params?: any) => request.get("/article/list", params),

    /**
     * 全部文章列表
     */
    allList: (params?: any) => request.get("/article/allList", params),

    /**
     * 文章回收站列表
     */
    recycleBinList: (params?: any) => request.get("/article/recycleBinList", params),

    /**
     * 获取文章详情
     */
    detail: (params?: any) => request.get("/article/detail", params),

    /**
     * 文章添加
     */
    add: (params?: any) => request.post("/article/add", params),

    /**
     * 文章编辑
     */
    edit: (params?: any) => request.put("/article/edit", params),

    /**
     * 文章状态
     */
    updateStatus: (params?: any) => request.put("/article/updateStatus", params),

    /**
     * 文章删恢复
     */
    deleteRecovery: (params?: any) => request.delete("/article/deleteRecovery", params),

    /**
     * 文章删恢复
     */
    delete: (params?: any) => request.delete("/article/delete", params)
}

export default articleApi
