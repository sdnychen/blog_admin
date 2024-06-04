import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layouts/Layout.vue"
import { markRaw } from "vue"
import {
    FolderOutline,
    CloudOfflineOutline,
    CloudOutline
} from "@vicons/ionicons5"

const home: Array<RouteRecordRaw> = [
    {
        path: "/material",
        name: "Material",
        component: Layout,
        redirect: "/material/localMaterial",
        meta: {
            title: "素材",
            auth: [1],
            icon: markRaw(FolderOutline)
        },
        children: [
            {
                path: "localMaterial",
                name: "LocalMaterial",
                component: () => import("@/views/Home/home.vue"),
                meta: {
                    title: "本地",
                    icon: markRaw(CloudOfflineOutline)
                }
            },
            {
                path: "cloudMaterial",
                name: "CloudMaterial",
                component: () => import("@/views/Home/home.vue"),
                meta: {
                    title: "云",
                    icon: markRaw(CloudOutline)
                }
            }
        ]
    }
]

export default home
