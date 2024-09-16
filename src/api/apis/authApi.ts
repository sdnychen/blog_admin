import { api } from '@/api'

const authApi = {
    /**
     * 全部权限列表
     */
    getAllList: () => api.get<AuthResponse[]>('/auth/allList')
}

export default authApi
