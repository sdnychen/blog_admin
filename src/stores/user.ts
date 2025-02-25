import { defineStore } from 'pinia'
import { sha256 } from 'js-sha256'
import BaseApi from '@/api/apis/baseApi'
import { useMenuStore } from './menu'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            userInfo: null as UserInfo | null
        }
    },
    actions: {
        // 登录
        login(loginForm: LoginForm) {
            return new Promise( (resolve, reject) => {
                BaseApi.login({
                    ...loginForm,
                    password: sha256(loginForm.password)
                }).then(res => {
                    if (res.success) {
                        this.userInfo = res.data.userInfo
                        resolve(true)
                    }
                    reject(false)
                }).catch(() => {
                    reject(false)
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
            const menuStore = useMenuStore()
            this.userInfo = null
            menuStore.isGenerate = false
            sessionStorage.removeItem('tabs')
            localStorage.removeItem('token')
        },

        // 获取权限
        getAuth(): string[] {
            const auth: Array<string> = []
            if (!this.userInfo?.auth) {
                return auth
            }
            for (let i = 0; i < this.userInfo.auth.length; i += 2) {
                auth.push(parseInt(this.userInfo.auth.charAt(i) + this.userInfo.auth.charAt(i + 1), 16).toString(2))
            }
            return auth
        }
    }
})
