import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layouts/Layout.vue"
import {
  ChatboxEllipsesOutline
} from "@vicons/ionicons5"

const home: Array<RouteRecordRaw> = [
  {
    path: "/comment",
    name: "comment",
    component: Layout,
    redirect: "/comment/comment",
    meta: {
      title: "评论",
      auth: [1],
      icon: ChatboxEllipsesOutline
    },
    children: [
      {
        path: "comment",
        name: "CommentManage",
        component: () => import("@/views/Home/home.vue"),
        meta: {
          title: "评论管理",
          icon: ChatboxEllipsesOutline
        }
      }
    ]
  }
]

export default home
