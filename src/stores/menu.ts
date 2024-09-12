import { defineStore } from 'pinia'
import { type RouteRecordRaw } from 'vue-router'
import { useUserStore } from './user'
import { useSettingStore } from './setting'

/**
 * 判断一个路由是否有权限
 * @param route 路由
 * @param auth 权限
 * @returns 是否有权限
 */
const hasAuth = (route: any, auth: Array<string>): boolean => {
    if (route?.meta?.auth) {
        // 根据二进制位运算判断权限的时候启用
        if (typeof route.meta.auth === 'string') {
            const routerAuthArray = route.meta.auth.split(':')
            return (parseInt(auth[routerAuthArray[0]], 2) & parseInt(routerAuthArray[1], 16)) !== 0
        }
        let flag = false
        for (const routerAuth of route.meta.auth) {
            const routerAuthArray = routerAuth.split(':')
            flag = (parseInt(auth[routerAuthArray[0]], 2) & parseInt(routerAuthArray[1], 2)) !== 0 ? true : false
            if (flag) break
        }
        return flag
        // 需要判断权限列表中是否包含某一个权限的时候启用
        // return auth.some(authCode => {
        //     return route.meta.auth.some((routeAuthCode: string | number) => {
        //         return routeAuthCode === authCode
        //     })
        // })
    } else {
        return true
    }
}

/**
 * 过滤出有权限的路由
 * @param routes 路由列表
 * @param auth 权限列表
 * @returns 过滤后的路由
 */
const filterRouterByAuth = (routes: RouteRecordRaw[], auth: Array<string>) => {
    const list: RouteRecordRaw[] = []
    routes.forEach(route => {
        if (hasAuth(route, auth)) {
            if (route.children) {
                route.children = filterRouterByAuth(route.children, auth)
                route.children.length && list.push(route)
            } else {
                list.push(route)
            }
        }
    })
    return list
}

export const useMenuStore = defineStore('menu', {
    state: () => {
        return {
            isGenerate: false,
            routes: [] as RouteRecordRaw[]
        }
    },
    actions: {
        /**
         * 生成路由
         * @param data 全部路由
         * @returns 生成的路由
         */
        generateRouter(data: RouteRecordRaw[]) {
            let accessRouter: RouteRecordRaw[] = []
            const settingStore = useSettingStore()
            if (settingStore.setting.enable_auth) {
                const userStore = useUserStore()

                const auth = userStore.getAuth()
                accessRouter = filterRouterByAuth(data, auth)
            } else {
                accessRouter = data
            }
            this.routes = accessRouter
            this.isGenerate = true
            return accessRouter
        }
    }
})
