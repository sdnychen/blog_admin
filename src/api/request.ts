import axios from "axios"
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { createDiscreteApi } from "naive-ui"
import { useUserStore } from "@/stores/user"
import router from "@/router/index"

const { message } = createDiscreteApi(["message"])

class server {
    instance: AxiosInstance
    baseConfig: AxiosRequestConfig

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
        this.baseConfig = config

        // 请求拦截器
        this.instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
            request.headers.Authorization = localStorage.getItem("token")
            return request
        }, (err: any) => {
            return Promise.reject(err)
        })
        // 响应拦截器
        this.instance.interceptors.response.use(async (response: AxiosResponse) => {
            // 统一消息通知处理
            response.headers.authorization && localStorage.setItem("token", response.headers.authorization)
            const resolve = response.data
            if (resolve.success && resolve.msg) {
                message.success(resolve.msg)
            } else if (!resolve.success && resolve.msg) {
                message.warning(resolve.msg)
            }
            // token过期
            if (resolve.code === 40103) {
                const userStore = useUserStore()
                userStore.logout()
                await router.replace({ name: "Login" })
            }

            return resolve
        }, (err: any) => {
            return Promise.reject(err)
        })
    }

    /**
     * 通用请求
     * @param config
     */
    public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
        return this.instance.request(config)
    }

    /**
     * GET请求
     * @param url
     * @param params
     * @param config
     */
    public get<T = any>(url: string, params?: Object, config?: AxiosRequestConfig): Promise<Resulve<T>> {
        return this.instance.get(url, {...config, params})
    }

    /**
     * POST请求
     * @param url
     * @param data
     * @param config
     */
    public post<T = any>(url: string, data?: Object, config?: AxiosRequestConfig): Promise<Resulve<T>> {
        return this.instance.post(url, data, config)
    }

    /**
     * PUT请求
     * @param url
     * @param data
     * @param config
     */
    public put<T = any>(url: string, data?: Object, config?: AxiosRequestConfig): Promise<Resulve<T>> {
        return this.instance.put(url, data, config)
    }

    /**
     * DELETE请求
     * @param url
     * @param params
     * @param config
     */
    public delete<T = any>(url: string, params?: Object, config?: AxiosRequestConfig): Promise<Resulve<T>> {
        return this.instance.delete(url, {...config, params})
    }
}

export default server
