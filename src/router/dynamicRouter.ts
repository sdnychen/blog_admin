import type { RouteRecordRaw } from 'vue-router'
// import Layout from "@/layouts/Layout.vue"

import home from './module/home'
import post from './module/post'
import material from './module/material'
import comment from './module/comment'
import member from './module/member'
import user from './module/user'
import menu from './module/menu'
import blogRoll from './module/blogroll'
import ad from './module/ad'
import setting from './module/setting'

// 动态路由
const dynamicRouter: Array<RouteRecordRaw> = [
    ...home,
    ...post,
    ...material,
    ...comment,
    ...member,
    ...user,
    ...menu,
    ...blogRoll,
    ...ad,
    ...setting
]

export default dynamicRouter
