import { api } from '@/api'

const baseApi = {
    /**
     * 列表
     */
    list: (param: CommentArticleQueryParam) => {
        return api.get<string>('/commentArticle/list', param)
    },

    /**
     * 审核
     */
    review: (param: CommentStatusUpdateParam) => {
        return api.put<string>('/commentArticle/review', param)
    },

    /**
     * 删除
     */
    delete: (param: IDParam) => {
        return api.delete<string>('/commentArticle/delete', param)
    }
}

export default baseApi
