import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/Layout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import { markRaw } from 'vue'
import {
    FileTrayFullOutline,
    ReceiptOutline,
    ApertureOutline
} from '@vicons/ionicons5'

const home: Array<RouteRecordRaw> = [
    {
        path: '/post',
        name: 'post',
        component: Layout,
        redirect: '/post/article',
        meta: {
            title: '帖子',
            auth: '3:3',
            icon: markRaw(FileTrayFullOutline)
        },
        children: [
            {
                path: 'article',
                name: 'Article',
                component: EmptyLayout,
                redirect: '/post/article/article',
                meta: {
                    title: '文章',
                    auth: '3:1',
                    icon: markRaw(ReceiptOutline)
                },
                children: [
                    {
                        path: 'article',
                        name: 'ArticleManage',
                        component: () => import('@/views/Article/article.vue'),
                        meta: {
                            title: '文章管理'
                        }
                    },
                    {
                        path: 'create',
                        name: 'ArticleCreate',
                        component: () => import('@/views/Article/create.vue'),
                        meta: {
                            title: '文章新增',
                            show: false
                        }
                    },
                    {
                        path: 'edit',
                        name: 'ArticleEdit',
                        component: () => import('@/views/Article/details.vue'),
                        meta: {
                            title: '文章详情',
                            show: false
                        }
                    },
                    {
                        path: 'sort',
                        name: 'SortManage',
                        component: () => import('@/views/Article/sort.vue'),
                        meta: {
                            title: '分类管理'
                        }
                    },
                    {
                        path: 'tag',
                        name: 'TagManage',
                        component: () => import('@/views/Article/tag.vue'),
                        meta: {
                            title: '标签管理'
                        }
                    },
                    {
                        path: 'recycleBin',
                        name: 'RecycleBin',
                        component: () => import('@/views/Article/recycleBin.vue'),
                        meta: {
                            title: '回收站'
                        }
                    }
                ]
            },
            {
                path: 'moment',
                name: 'Moment',
                component: EmptyLayout,
                redirect: '/post/moment/moment',
                meta: {
                    title: '动态',
                    auth: '3:2',
                    icon: markRaw(ApertureOutline)
                },
                children: [
                    {
                        path: 'moment',
                        name: 'MomentManage',
                        component: () => import('@/views/Home/home.vue'),
                        meta: {
                            title: '动态管理'
                        }
                    },
                    {
                        path: 'momentDrafts',
                        name: 'MomentDrafts',
                        component: () => import('@/views/Home/home.vue'),
                        meta: {
                            title: '动态草稿箱'
                        }
                    }
                ]
            }
        ]
    }
]

export default home
