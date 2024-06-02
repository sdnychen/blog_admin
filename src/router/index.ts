import { createRouter, createWebHashHistory} from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import constantRouter from "./constantRouter"
import { useUserStore } from "@/stores/user"
import { useMenuStore } from "@/stores/menu"

import home from "@/router/module/home"
import test from "@/router/module/test"

const routes: Array<RouteRecordRaw> = [
  ...constantRouter
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const asyncRouter: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home11",
    meta: {
      title: "主控",
      // auth: [1],
      icon: ""
    },
    children: [
      ...home
    ]
  },
  {
    path: "/test",
    name: "Test",
    meta: {
      title: "主控TT",
      // auth: [1],
      icon: ""
    },
    children: [
      ...test
    ]
  }
]

// 最后添加的路由
// const lastRouter: Array<RouteRecordRaw> = [
// ]

// 全局前置守卫
router.beforeEach((to) => {
  const userStore = useUserStore()
  const menuStore = useMenuStore()

  // useUser.addRouter(routeList)

  if (userStore.$state.isLogin) {
    if (!menuStore.isGenerate) {
      // 已登录，还没挂在路由
      const accessRouter = menuStore.generateRouter(asyncRouter)
      accessRouter.forEach(item => {
        console.log("item", item)
        router.addRoute(item)
      })
      return to.fullPath
    }

    if (to.name === "Login") {
      return {name: "Home"}
    } else {
      return true
    }
  } else {
    if (to.name === "Login") {
      return true
    } else {
      return {name: "Login"}
    }
  }
})

export default router
