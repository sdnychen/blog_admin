import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layouts/Layout.vue"
import EmptyLayout from "@/layouts/EmptyLayout.vue"
import {
  SettingsOutline,
  InformationCircleOutline,
  BuildOutline,
  ColorPaletteOutline,
  DocumentTextOutline
} from "@vicons/ionicons5"

const home: Array<RouteRecordRaw> = [
  {
    path: "/setting",
    name: "Setting",
    component: Layout,
    redirect: "/setting/baseInfo",
    meta: {
      title: "设置",
      auth: [1],
      icon: SettingsOutline
    },
    children: [
      {
        path: "baseInfo",
        name: "BaseInfoSetting",
        component: () => import("@/views/Home/home.vue"),
        meta: {
          title: "基本信息",
          icon: InformationCircleOutline
        }
      },
      {
        path: "configInfo",
        name: "ConfigInfoSetting",
        component: EmptyLayout,
        meta: {
          title: "配置信息",
          icon: BuildOutline
        },
        children: [
          {
            path: "commentConfig",
            name: "CommentConfig",
            component: () => import("@/views/Home/home.vue"),
            meta: {
              title: "评论"
            }
          },
          {
            path: "asideConfig",
            name: "AsideConfig",
            component: () => import("@/views/Home/home.vue"),
            meta: {
              title: "侧边栏"
            }
          }
        ]
      },
      {
        path: "themeStyle",
        name: "ThemeStyleSetting",
        component: () => import("@/views/Home/home.vue"),
        meta: {
          title: "主题样式",
          icon: ColorPaletteOutline
        }
      },
      {
        path: "agreement",
        name: "AgreementSetting",
        component: () => import("@/views/Home/home.vue"),
        meta: {
          title: "协议条款",
          icon: DocumentTextOutline
        }
      }
    ]
  }
]

export default home
