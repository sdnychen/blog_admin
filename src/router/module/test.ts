import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layouts/Layout.vue"

const home: Array<RouteRecordRaw> = [
  {
    path: "/test",
    name: "Test",
    component: Layout,
    redirect: "/test/test1",
    meta: {
      title: "主控台",
      auth: [1],
      icon: ""
    },
    children: [
      {
        path: "test1",
        name: "TestIndex",
        component: () => import("@/views/home.vue"),
        meta: {
          title: "欢迎页"
        }
      },
      {
        path: "test2",
        name: "TestIndex11",
        component: () => import("@/views/home.vue"),
        meta: {
          title: "欢迎页2"
        }
      }
    ]
  }
]

export default home
