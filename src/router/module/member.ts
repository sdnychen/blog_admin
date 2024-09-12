import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/Layout.vue'
import { markRaw } from 'vue'
import {
    PersonCircleOutline,
    TrendingUpSharp
} from '@vicons/ionicons5'

const home: Array<RouteRecordRaw> = [
    {
        path: '/member',
        name: 'Member',
        component: Layout,
        redirect: '/member/member',
        meta: {
            title: '会员',
            auth: '2:3',
            icon: markRaw(PersonCircleOutline)
        },
        children: [
            {
                path: 'member',
                name: 'MemberManage',
                component: () => import('@/views/Home/home.vue'),
                meta: {
                    title: '会员管理',
                    auth: '2:1',
                    icon: markRaw(PersonCircleOutline)
                }
            },
            {
                path: 'memberLevel',
                name: 'MemberLevel',
                component: () => import('@/views/Home/home.vue'),
                meta: {
                    title: '会员等级',
                    auth: '2:2',
                    icon: markRaw(TrendingUpSharp)
                }
            }
        ]
    }
]

export default home
