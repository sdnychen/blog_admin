import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layouts/Layout.vue"

// 静态路由
const staticRouter: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Main",
        component: Layout,
        redirect: "/home",
        children: [
            {
                path: "/persional",
                name: "Persional",
                component: () => import("@/views/Home/home.vue"),
                meta: {
                    title: "个人中心"
                }
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/login.vue")
    }
]

export default staticRouter
