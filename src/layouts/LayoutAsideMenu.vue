<script lang="ts" setup>
import { h, onBeforeMount, ref, type Component } from "vue"
import { RouterLink, type RouteRecordRaw } from "vue-router"
import type { MenuOption } from "naive-ui"
import { NIcon } from "naive-ui"
import { useMenuStore } from "@/stores/menu"

const menuStore = useMenuStore()

const menuOptions = ref<MenuOption[]>([])

// 图标函数
const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

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
      icon: route.meta?.icon ? renderIcon(route.meta.icon) : void 0,
      children: route.children?.length ? generateMenu(route.children) : void 0
    })
  })
  return menuList
}

menuStore.$subscribe((mutation: any, state) => {
  if (mutation.events.key === "activeMainMenu") {
    menuOptions.value = generateMenu(menuStore.routes, state.activeMainMenu) as any
  }
})

onBeforeMount(() => {
  menuOptions.value = generateMenu(menuStore.routes, menuStore.activeMainMenu) as any
})

</script>

<template>
  <div>
    <div class="logo-box">
      <span class="logo-title">
        Admin
      </span>
    </div>
    <n-menu
      :collapsed="false"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :indent="20"
      :options="menuOptions"
    />
  </div>
</template>

<style lang="scss" scope>
.logo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 100%;
  padding: 1rem 0;
  .logo-title {
    position: relative;
    top: -2px;
    font-size: 2.4rem;
    cursor: pointer;
  }
}
</style>
