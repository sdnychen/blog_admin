import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layouts/Layout.vue"
import {
  EaselOutline
} from "@vicons/ionicons5"

const home: Array<RouteRecordRaw> = [
  {
    path: "/ad",
    name: "AD",
    component: Layout,
    redirect: "/ad/ad",
    meta: {
      title: "广告",
      auth: [1],
      icon: EaselOutline
    },
    children: [
      {
        path: "ad",
        name: "ADManage",
        component: () => import("@/views/Home/home.vue"),
        meta: {
          title: "广告管理",
          icon: EaselOutline
        }
      }
    ]
  }
]

export default home
