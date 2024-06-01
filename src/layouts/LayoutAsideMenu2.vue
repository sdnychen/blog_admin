<script lang="ts" setup>
import { h, onMounted, ref, type Component } from "vue"
import { RouterLink, type RouteRecordRaw } from "vue-router"
import type { MenuOption } from "naive-ui"
import { NIcon } from "naive-ui"
import { useMenuStore } from "@/stores/menu"
import { HomeOutline } from "@vicons/ionicons5"
import LayoutLogo from "./LayoutLogo.vue"

const menuStore = useMenuStore()

const menuOptions = ref<MenuOption[]>([])

// 图标函数
const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

// 生成菜单
const generateMenu = (routes: RouteRecordRaw[]): MenuOption[] => {
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
        { default: () => route.name }
      ),
      key: route.name as string,
      icon: renderIcon(HomeOutline),
      children: route.children?.length ? generateMenu(route.children) : void 0
    })
  })
  return menuList
}

onMounted(() => {
  menuOptions.value = generateMenu(menuStore.routes) as any
})

</script>

<template>
  <div>
    <LayoutLogo />
    <n-menu
      :collapsed="false"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
    />
  </div>
</template>

<style lang="scss" scope>
</style>
