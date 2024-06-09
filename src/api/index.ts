import server from "./request"

export const request = new server({
    baseURL: import.meta.env.VITE_BASE_URL,
    // timeout: 5000,
    withCredentials: true
})
