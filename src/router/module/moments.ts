import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layouts/Layout.vue"

const home: Array<RouteRecordRaw> = [
  {
    path: "/moments",
    name: "Moments",
    component: Layout,
    redirect: "/moments/moments",
    meta: {
      title: "动态",
      auth: [1],
      icon: ""
    },
    children: [
      {
        path: "moments",
        name: "MomentsManage",
        component: () => import("@/views/Home/home.vue"),
        meta: {
          title: "动态管理"
        }
      }
    ]
  }
]

export default home
