import server from './request'

export const api = new server({
    baseURL: import.meta.env.VITE_BASE_URL,
    // timeout: 5000,
    withCredentials: true
})
