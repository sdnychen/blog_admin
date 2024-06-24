import { request } from "../index"

const authApi = {
    getAllList: () => request.get("/auth/allList")
}

export default authApi
