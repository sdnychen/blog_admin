<script lang="ts" setup>
import { h, watch, ref, nextTick } from 'vue'
import { RouterLink, type RouteRecordRaw } from 'vue-router'
import type { MenuInst, MenuOption } from 'naive-ui'
import { useMenuStore } from '@/stores/menu'
import IconRender from '@/utils/IconRender'
import { useRouter } from 'vue-router'

const menuStore = useMenuStore()
const router = useRouter()

const menuOptions = ref<MenuOption[]>([])

// 当前菜单
const currMenu = ref<string>('')

// 生成菜单
const generateMenu = (routes: RouteRecordRaw[], activeMainMenu?: string | undefined): MenuOption[] => {
    if (activeMainMenu) {
        let t: RouteRecordRaw[] = []
        routes.forEach(item => {
            if (item.path === activeMainMenu) {
                t = item.children as RouteRecordRaw[]
            }
        })
        routes = t
    }
    const menuList: MenuOption[] = []
    routes.forEach((route: RouteRecordRaw) => {
        menuList.push({
            label: () => h(
                RouterLink,
                {
                    to: {
                        name: route.name
                    }
                },
                { default: () => route.meta?.title }
            ),
            key: route.name as string,
            icon: route.meta?.icon ? IconRender(route.meta.icon) : void 0,
            children: route.children?.length ? generateMenu(route.children) : void 0
        })
    })
    return menuList
}

// 切换菜单
const changeMenu = (key: string) => {
    router.push({ name: key })
}

// MenuRef
const menuRef = ref<MenuInst | null>(null)
// 展开菜单
const expandMenu = () => {
    menuRef.value?.showOption(currMenu.value)
}

// 监听路由变化
watch(() => router.currentRoute.value, (newValue, oldValue) => {
    if (newValue.matched[0].path !== oldValue?.matched[0]?.path) {
        menuOptions.value = generateMenu(menuStore.routes, newValue.matched[0].path) as any
    }
    currMenu.value = newValue.name as string
    nextTick(() => {
        expandMenu()
    })
}, { immediate: true })
</script>

<template>
    <div class="menu-box">
        <div class="logo-box">
            <span class="logo-title">
                Admin
            </span>
        </div>
        <n-scrollbar>
            <n-menu ref="menuRef" :collapsed="false" :collapsed-width="64" :collapsed-icon-size="22" :indent="20"
                :value="currMenu" :options="menuOptions" :on-update:value="changeMenu" />
        </n-scrollbar>
    </div>
</template>

<style lang="scss" scoped>
.logo-box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: $menu-logo-box-height;

    .logo-title {
        position: relative;
        top: -2px;
        font-size: 2.4rem;
        cursor: pointer;
    }
}

.menu-box .n-scrollbar {
    height: calc(100vh - $menu-logo-box-height);
}
</style>
