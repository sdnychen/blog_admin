import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/Layout.vue'
import { markRaw } from 'vue'
import {
    ChatboxEllipsesOutline
} from '@vicons/ionicons5'

const home: Array<RouteRecordRaw> = [
    {
        path: '/comment',
        name: 'Comment',
        component: Layout,
        redirect: '/comment/comment',
        meta: {
            title: '评论',
            auth: '4:3',
            icon: markRaw(ChatboxEllipsesOutline)
        },
        children: [
            {
                path: 'comment',
                name: 'CommentManage',
                component: () => import('@/views/Home/home.vue'),
                meta: {
                    title: '评论管理',
                    auth: '4:1',
                    icon: markRaw(ChatboxEllipsesOutline)
                }
            },
            {
                path: 'setting',
                name: 'CommentSetting',
                component: () => import('@/views/Home/home.vue'),
                meta: {
                    title: '评论设置',
                    auth: '4:2',
                    icon: markRaw(ChatboxEllipsesOutline)
                }
            }
        ]
    }
]

export default home
