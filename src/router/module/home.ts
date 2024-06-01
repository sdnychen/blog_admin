import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layouts/Layout.vue"

const home: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Home",
    component: Layout,
    redirect: "/home/index",
    meta: {
      title: "主控台",
      auth: [1],
      icon: ""
    },
    children: [
      {
        path: "index",
        name: "HomeIndex",
        component: () => import("@/views/home.vue"),
        meta: {
          title: "欢迎页"
        }
      },
      {
        path: "index11",
        name: "HomeIndex11",
        component: () => import("@/views/home.vue"),
        meta: {
          title: "欢迎页2"
        }
      }
    ]
  }
]

export default home
