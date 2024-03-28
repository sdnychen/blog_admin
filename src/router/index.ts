import { createRouter, createWebHashHistory} from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import constantRouter from "./constantRouter"
import { useUserStore } from "@/stores/user"

// import home from "@/router/module/home"

const routes: Array<RouteRecordRaw> = [
  ...constantRouter
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// const routeList = [
//   home
// ]

// const useUser = useUserStore()
// useUser.addRouter(routeList)

// 最后添加的路由
// const lastRouter: Array<RouteRecordRaw> = [
// ]
// lastRouter.forEach((item => {
//   router.addRoute(item)
// }))

// 全局前置守卫
router.beforeEach((to) => {
  const useUser = useUserStore()
  const token = useUser.$state.token
  if (!token) {
    if (to.name === "Login") {
      return true
    } else {
      return {name: "Login"}
    }
  } else {
    if (to.name === "Login") {
      return {name: "Home"}
    } else {
      return true
    }
  }
})

export default router
