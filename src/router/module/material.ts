import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layouts/Layout.vue"
import EmptyLayout from "@/layouts/EmptyLayout.vue"
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
            auth: "9:3",
            icon: markRaw(FolderOutline)
        },
        children: [
            {
                path: "localMaterial",
                name: "LocalMaterial",
                component: () => import("@/views/Home/home.vue"),
                meta: {
                    title: "本地",
                    auth: "9:1",
                    icon: markRaw(CloudOfflineOutline)
                }
            },
            {
                path: "cloudMaterial",
                name: "CloudMaterial",
                component: EmptyLayout,
                redirect: "/material/cloudMaterial/ossCloupMaterial",
                meta: {
                    title: "云",
                    auth: "9:2",
                    icon: markRaw(CloudOutline)
                },
                children: [
                    {
                        path: "ossCloupMaterial",
                        name: "OSSCloupMaterial",
                        component: () => import("@/views/Home/home.vue"),
                        meta: {
                            title: "OSS"
                        }
                    }
                ]
            }
        ]
    }
]

export default home
