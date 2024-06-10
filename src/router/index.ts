import { createRouter, createWebHashHistory } from "vue-router"
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
        path: "/:productName(.*)*",
        name: "NotFound",
        component: () => import("@/views/404.vue")
    }
]

// 全局前置守卫
router.beforeEach(async (to) => {
    const userStore = useUserStore()
    const menuStore = useMenuStore()

    if (localStorage.getItem("token")) {
        if (userStore.userInfo) {
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
                return { name: "Home" }
            }
            return true
        } else {
            const check = await userStore.check()
            if (check) {
                return to.fullPath
            }
            return { name: "Login" }
        }
    } else {
        if (to.name === "Login") {
            return
        }
        return { name: "Login" }
    }
})

export default router
