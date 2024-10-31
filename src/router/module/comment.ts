import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/Layout.vue'
import { markRaw } from 'vue'
import {
    ApertureOutline,
    ChatboxEllipsesOutline, ReceiptOutline, BuildOutline
} from '@vicons/ionicons5'

const home: Array<RouteRecordRaw> = [
    {
        path: '/comment',
        name: 'Comment',
        component: Layout,
        redirect: '/comment/article',
        meta: {
            title: '评论',
            auth: '4:7',
            icon: markRaw(ChatboxEllipsesOutline)
        },
        children: [
            {
                path: 'article',
                name: 'ArticleCommentManage',
                component: () => import('@/views/Comment/articleComment.vue'),
                meta: {
                    title: '文章评论',
                    auth: '4:1',
                    icon: markRaw(ReceiptOutline)
                }
            },
            {
                path: 'moment',
                name: 'MomentCommentManage',
                component: () => import('@/views/Comment/articleComment.vue'),
                meta: {
                    title: '动态评论',
                    auth: '4:2',
                    icon: markRaw(ApertureOutline)
                }
            },
            {
                path: 'setting',
                name: 'CommentSetting',
                component: () => import('@/views/Home/home.vue'),
                meta: {
                    title: '评论设置',
                    auth: '4:4',
                    icon: markRaw(BuildOutline)
                }
            }
        ]
    }
]

export default home
