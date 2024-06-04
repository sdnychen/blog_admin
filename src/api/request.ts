import axios from "axios"
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { createDiscreteApi } from "naive-ui"

const { message } = createDiscreteApi(["message"])

export interface Resulve<T = any> {
    success: boolean,
    code: number,
    msg: string,
    data: T
}

class server {
    instance: AxiosInstance
    baseConfig: AxiosRequestConfig

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
        this.baseConfig = config

        // 请求拦截器
        this.instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
            // console.log("request", request)
            return request
        }, (err: any) => {
            return Promise.reject(err)
        })
        // 响应拦截器
        this.instance.interceptors.response.use((response: AxiosResponse) => {
            // 统一消息通知处理
            const resolve = response.data
            if (resolve.success && resolve.msg) {
                message.success(resolve.msg)
            } else if (!resolve.success && resolve.msg) {
                message.warning(resolve.msg)
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
     * @param config
     */
    public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<Resulve<T>> {
        return this.instance.get(url, config)
    }

    /**
     * POST请求
     * @param config
     */
    public post<T = any>(url: string, data?: Object, config?: AxiosRequestConfig): Promise<Resulve<T>> {
        return this.instance.post(url, data, config)
    }

    /**
     * PUT请求
     * @param config
     */
    public put<T = any>(url: string, data?: Object, config?: AxiosRequestConfig): Promise<Resulve<T>> {
        return this.instance.put(url, data, config)
    }

    /**
     * PUT请求
     * @param config
     */
    public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<Resulve<T>> {
        return this.instance.delete(url, config)
    }
}

export default server
