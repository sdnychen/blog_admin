import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/Layout.vue'
import { markRaw } from 'vue'
import {
    LinkOutline
} from '@vicons/ionicons5'

const home: Array<RouteRecordRaw> = [
    {
        path: '/blogroll',
        name: 'Blogroll',
        component: Layout,
        redirect: '/blogroll/blogroll',
        meta: {
            title: '友链',
            auth: '7:1',
            icon: markRaw(LinkOutline)
        },
        children: [
            {
                path: 'blogroll',
                name: 'BlogrollManage',
                component: () => import('@/views/Home/home.vue'),
                meta: {
                    title: '友链管理',
                    icon: markRaw(LinkOutline)
                }
            }
        ]
    }
]

export default home
