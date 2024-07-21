import { request } from "../index"

const articleTagApi = {
    /**
     * 文章标签列表
     */
    list: (params?: any) => request.get("/articleTag/list", params),

    /**
     * 全部文章标签列表
     */
    allList: (params?: any) => request.get("/articleTag/allList", params),

    /**
     * 获取文章详情
     */
    detail: (params?: any) => request.get("/articleTag/detail", params),

    /**
     * 文章标签添加
     */
    add: (params?: any) => request.post("/articleTag/add", params),

    /**
     * 文章标签编辑
     */
    edit: (params?: any) => request.put("/articleTag/edit", params),

    /**
     * 文章标签删除
     */
    delete: (params?: any) => request.delete("/articleTag/delete", params)
}

export default articleTagApi
