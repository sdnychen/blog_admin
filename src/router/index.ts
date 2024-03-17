import { createRouter, createWebHistory} from "vue-router"
import type { RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    // redirect: "/home",
    component: () => import("@/layouts/LayoutIndex.vue")
    // children: [

    // ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
