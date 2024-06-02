import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layouts/Layout.vue"
import {
  CubeOutline,
  HomeOutline,
  TvOutline
} from "@vicons/ionicons5"

const home: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Home",
    component: Layout,
    redirect: "/home/welcome",
    meta: {
      title: "主控台",
      auth: [1],
      icon: CubeOutline
    },
    children: [
      {
        path: "welcome",
        name: "Welcome",
        component: () => import("@/views/Home/home.vue"),
        meta: {
          title: "欢迎",
          icon: HomeOutline
        }
      },
      {
        path: "overview",
        name: "Overview",
        component: () => import("@/views/Home/home.vue"),
        meta: {
          title: "总览",
          icon: TvOutline
        }
      }
    ]
  }
]

export default home
