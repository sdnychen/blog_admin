import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layouts/Layout.vue"
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
      auth: [1],
      icon: Menu
    },
    children: [
      {
        path: "menu",
        name: "MenuManage",
        component: () => import("@/views/Home/home.vue"),
        meta: {
          title: "菜单管理",
          icon: Menu
        }
      }
    ]
  }
]

export default home
