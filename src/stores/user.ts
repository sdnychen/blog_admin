import { defineStore } from "pinia"
import { sha256 } from "js-sha256"
import BaseApi from "@/api/apis/baseApi"

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            userInfo: null as null | Object
        }
    },
    actions: {
        // 登录
        login(loginForm: LoginForm) {
            return new Promise(async (resolve, reject) => {
                BaseApi.login({
                    ...loginForm,
                    password: sha256(loginForm.password)
                }).then(res => {
                    if (res.success) {
                        this.userInfo = res.data.userInfo
                        resolve(true)
                    }
                    reject(false)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        // 登录检测
        check() {
            return new Promise((resolve, reject) => {
                BaseApi.check().then(res => {
                    if (res.success) {
                        this.userInfo = res.data.userInfo
                        resolve(true)
                    } else {
                        this.logout()
                        reject(false)
                    }
                }).catch(() => {
                    reject(false)
                })
            })
        },

        // 退出登录
        logout() {
            this.userInfo = null
            sessionStorage.removeItem("tabs")
            localStorage.removeItem("token")
        },

        // 获取权限
        getAuth() {
            const auth: Array<number | string> = []
            auth.push(1)
            auth.push(2)
            return auth
        }
    }
})
