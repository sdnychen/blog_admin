import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layouts/Layout.vue"
import EmptyLayout from "@/layouts/EmptyLayout.vue"
import { markRaw } from "vue"
import {
  FileTrayFullOutline,
  ReceiptOutline,
  ApertureOutline
} from "@vicons/ionicons5"

const home: Array<RouteRecordRaw> = [
  {
    path: "/content",
    name: "Content",
    component: Layout,
    redirect: "/content/article",
    meta: {
      title: "内容",
      auth: [1],
      icon: markRaw(FileTrayFullOutline)
    },
    children: [
      {
        path: "article",
        name: "Article",
        component: EmptyLayout,
        redirect: "/content/article/article",
        meta: {
          title: "文章",
          icon: markRaw(ReceiptOutline)
        },
        children: [
          {
            path: "article",
            name: "ArticleManage",
            component: () => import("@/views/Home/home.vue"),
            meta: {
              title: "文章管理"
            }
          },
          {
            path: "sort",
            name: "SortManage",
            component: () => import("@/views/Home/home.vue"),
            meta: {
              title: "分类管理"
            }
          },
          {
            path: "tag",
            name: "TagManage",
            component: () => import("@/views/Home/home.vue"),
            meta: {
              title: "标签管理"
            }
          },
          {
            path: "articleDrafts",
            name: "ArticleDrafts",
            component: () => import("@/views/Home/home.vue"),
            meta: {
              title: "草稿箱"
            }
          }
        ]
      },
      {
        path: "moments",
        name: "Moments",
        component: EmptyLayout,
        redirect: "/content/moments/moments",
        meta: {
          title: "动态",
          icon: markRaw(ApertureOutline)
        },
        children: [
          {
            path: "moments",
            name: "MomentsManage",
            component: () => import("@/views/Home/home.vue"),
            meta: {
              title: "动态管理"
            }
          },
          {
            path: "momentsDrafts",
            name: "MomentsDrafts",
            component: () => import("@/views/Home/home.vue"),
            meta: {
              title: "草稿箱"
            }
          }
        ]
      }
    ]
  }
]

export default home
