import { request } from "@/api"

const articleSortApi = {
    /**
     * 文章分类列表
     */
    list: (params?: any) => request.get("/articleSort/list", params),

    /**
     * 全部文章分类列表
     */
    allList: (params?: any) => request.get("/articleSort/allList", params),

    /**
     * 获取文章详情
     */
    detail: (params?: any) => request.get("/articleSort/detail", params),

    /**
     * 文章分类添加
     */
    add: (params?: any) => request.post("/articleSort/add", params),

    /**
     * 文章分类编辑
     */
    edit: (params?: any) => request.put("/articleSort/edit", params),

    /**
     * 文章分类删除
     */
    delete: (params?: any) => request.delete("/articleSort/delete", params)
}

export default articleSortApi
