import { defineStore } from "pinia"
import type { RouteRecordRaw } from "vue-router"

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: ""
    }
  },
  actions: {
    addRouter(routes: RouteRecordRaw[][]) {
      console.log(routes)
    }
  }
})
