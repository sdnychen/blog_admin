import type { RouteRecordRaw } from 'vue-router'
// import Layout from "@/layouts/Layout.vue"

import home from './module/home'
import content from './module/content'
import material from './module/material'
import comment from './module/comment'
import menber from './module/member'
import user from './module/user'
import menu from './module/menu'
import blogroll from './module/blogroll'
import ad from './module/ad'
import setting from './module/setting'

// 动态路由
const dynamicRouter: Array<RouteRecordRaw> = [
    ...home,
    ...content,
    ...material,
    ...comment,
    ...menber,
    ...user,
    ...menu,
    ...blogroll,
    ...ad,
    ...setting
]

export default dynamicRouter
