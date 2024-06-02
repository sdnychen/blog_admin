import { createRouter, createWebHashHistory} from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import { useUserStore } from "@/stores/user"
import { useMenuStore } from "@/stores/menu"

import constantRouter from "./constantRouter"
import dynamicRouter from "./dynamicRouter"

const routes: Array<RouteRecordRaw> = [
  ...constantRouter
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const asyncRouter: RouteRecordRaw[] = dynamicRouter

// 最后添加的路由
const lastRouter: Array<RouteRecordRaw> = [
  {
    path: "/:productName",
    component: () => import("@/views/404.vue")
  }
]

// 全局前置守卫
router.beforeEach((to) => {
  const userStore = useUserStore()
  const menuStore = useMenuStore()

  // useUser.addRouter(routeList)

  if (userStore.$state.isLogin) {
    if (!menuStore.isGenerate) {
      // 已登录，还没挂在路由
      const accessRouter = menuStore.generateRouter(asyncRouter)
      accessRouter.push(...lastRouter)
      accessRouter.forEach(item => {
        router.addRoute(item)
      })
      return to.fullPath
    }

    if (to.name === "Login") {
      return {name: "Home"}
    } else {
      menuStore.activeMainMenu = to.matched[0].path
      menuStore.currMenu = to.name as string
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
