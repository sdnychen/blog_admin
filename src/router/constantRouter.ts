import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/Layout.vue'

// 静态路由
const staticRouter: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Main',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: '/persional',
                name: 'Persional',
                component: () => import('@/views/Home/home.vue'),
                meta: {
                    title: '个人中心'
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login.vue')
    }
]

const otherRouter: Array<RouteRecordRaw> = [
    {
        path: '/:productName(.*)*',
        name: 'NotFound',
        component: () => import('@/views/404.vue'),
        meta: {
            show: false
        }
    }
]

export default [...staticRouter, ...otherRouter]