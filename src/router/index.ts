import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useMenuStore } from '@/stores/menu'

import staticRouter from './constantRouter'
import dynamicRouter from './dynamicRouter'

// 定义meta类型
declare module 'vue-router' {
    interface RouteMeta {
        title: string,
        auth?: string | string[],
        icon?: object,
        show?: boolean,
        keepAlive?: boolean
    }
}

const router = createRouter({
    history: createWebHashHistory(),
    routes: staticRouter
})

// 全局前置守卫
router.beforeEach(async (to) => {
    const userStore = useUserStore()
    const menuStore = useMenuStore()

    if (localStorage.getItem('token')) {
        if (userStore.userInfo) {
            if (!menuStore.isGenerate) {
                // 已登录，还没挂在路由
                const accessRouter = menuStore.generateRouter(dynamicRouter)
                accessRouter.forEach(item => {
                    router.addRoute(item)
                })
                return to.fullPath
            }
            if (to.name === 'Login') {
                return { name: 'Main' }
            }
            return true
        } else {
            const check = await userStore.check()
            if (check) {
                return to.fullPath
            }
            return { name: 'Login' }
        }
    } else {
        if (to.name === 'Login') {
            return
        }
        return { name: 'Login' }
    }
})

export default router
