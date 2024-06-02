import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layouts/Layout.vue"
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
      icon: PersonOutline
    },
    children: [
      {
        path: "user",
        name: "UserManage",
        component: () => import("@/views/Home/home.vue"),
        meta: {
          title: "用户管理",
          icon: PersonOutline
        }
      },
      {
        path: "userGroup",
        name: "UserGroupManage",
        component: () => import("@/views/Home/home.vue"),
        meta: {
          title: "用户组管理",
          icon: PeopleOutline
        }
      }
    ]
  }
]

export default home
