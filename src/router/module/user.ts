import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layouts/Layout.vue"
import { markRaw } from "vue"
import {
    PersonOutline,
    PeopleOutline
} from "@vicons/ionicons5"

const home: Array<RouteRecordRaw> = [
    {
        path: "/user",
        name: "User",
        component: Layout,
        redirect: "/user/user",
        meta: {
            title: "用户",
            auth: [1],
            icon: markRaw(PersonOutline)
        },
        children: [
            {
                path: "user",
                name: "UserManage",
                component: () => import("@/views/User/user.vue"),
                meta: {
                    title: "用户管理",
                    icon: markRaw(PersonOutline)
                }
            },
            {
                path: "userGroup",
                name: "UserGroupManage",
                component: () => import("@/views/Home/home.vue"),
                meta: {
                    title: "用户组管理",
                    icon: markRaw(PeopleOutline)
                }
            }
        ]
    }
]

export default home
