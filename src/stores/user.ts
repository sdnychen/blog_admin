import { defineStore } from "pinia"
import { sha256 } from "js-sha256"
import userApi from "@/api/apis/userApi"

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userInfo: null as null | Object,
      isLogin: false,
      token: null as null | string
    }
  },
  actions: {
    // 登录
    login(loginForm: LoginForm) {
      return new Promise(async(resolve, reject) => {
        const res = await userApi.login({
          ...loginForm,
          password: sha256(loginForm.password)
        })
        if (res.success) {
          this.isLogin = true
          this.userInfo = res.data.userInfo
          localStorage.setItem("userInfo", res.data.userInfo)
          resolve(true)
        }
        reject(false)
      })
    },
    // 登录检测
    // async check() {
    //   const res = await userApi.check()
    //   if (res.success) {
    //     router.push({name: "Home"})
    //   }
    // }

    // 退出登录
    logout() {
      this.isLogin = false
      this.token = null
      this.userInfo = null
      localStorage.removeItem("userInfo")
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
