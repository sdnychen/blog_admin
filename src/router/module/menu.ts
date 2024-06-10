import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layouts/Layout.vue"
import { markRaw } from "vue"
import {
    Menu
} from "@vicons/ionicons5"

const home: Array<RouteRecordRaw> = [
    {
        path: "/menu",
        name: "Menu",
        component: Layout,
        redirect: "/menu/menu",
        meta: {
            title: "菜单",
            auth: "8:1",
            icon: markRaw(Menu)
        },
        children: [
            {
                path: "menu",
                name: "MenuManage",
                component: () => import("@/views/Home/home.vue"),
                meta: {
                    title: "菜单管理",
                    icon: markRaw(Menu)
                }
            }
        ]
    }
]

export default home
