import type { RouteRecordRaw } from "vue-router"
// import Layout from "@/layouts/Layout.vue"

// 静态路由
const staticRouter: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Main",
        redirect: "/home"
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/login.vue")
    }
]

export default staticRouter
