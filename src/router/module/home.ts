import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layouts/Layout.vue"

const home: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Home",
    component: Layout,
    redirect: "/home/index",
    children: [
      {
        path: "index",
        name: "HomeIndex",
        component: () => import("@/views/home.vue")
      }
    ]
  }
]

export default home
