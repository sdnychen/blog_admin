import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layouts/Layout.vue"
import EmptyLayout from "@/layouts/EmptyLayout.vue"
import { markRaw } from "vue"
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
            auth: "5:F",
            icon: markRaw(SettingsOutline)
        },
        children: [
            {
                path: "baseInfo",
                name: "BaseInfoSetting",
                component: () => import("@/views/Home/home.vue"),
                meta: {
                    title: "基本信息",
                    auth: "5:1",
                    icon: markRaw(InformationCircleOutline)
                }
            },
            {
                path: "configInfo",
                name: "ConfigInfoSetting",
                component: EmptyLayout,
                meta: {
                    title: "配置信息",
                    auth: "5:2",
                    icon: markRaw(BuildOutline)
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
                    auth: "5:4",
                    icon: markRaw(ColorPaletteOutline)
                }
            },
            {
                path: "agreement",
                name: "AgreementSetting",
                component: () => import("@/views/Home/home.vue"),
                meta: {
                    title: "协议条款",
                    auth: "5:8",
                    icon: markRaw(DocumentTextOutline)
                }
            }
        ]
    }
]

export default home
