<script lang="ts" setup>
import { ref, onBeforeMount } from "vue"
import { useMenuStore } from "@/stores/menu"
import { useRouter, type RouteRecordRaw } from "vue-router"

const menuStore = useMenuStore()
const router = useRouter()

// 菜单列表（路由）
const menuOptions: RouteRecordRaw[] = menuStore.routes

// 活动菜单
const activeMenu = ref<null | string>("")

// 切换导航
const navigateenu = (route: RouteRecordRaw) => {
  activeMenu.value = route.path
  menuStore.activeMainMenu = route.path
  router.push(route.path)
}

onBeforeMount(() => {
  activeMenu.value = menuStore.activeMainMenu
})
</script>

<template>
  <div>
    <div class="edge-menu-logo-box">
      <img class="edge-menu-logo" src="/public/favicon.ico" alt="logo">
    </div>

    <n-scrollbar class="edge-menu-box">
      <div
        v-for="item in menuOptions" :key="item.name"
        :class="['edge-menu-item', activeMenu === item.path ? 'edge-menu-active' : '']"
        @click="navigateenu(item)"
        >
        <NIcon v-if="item.meta?.icon" :component="item.meta.icon" size="20" />
        <div class="edge-menu-label">{{ item.meta?.title }}</div>
      </div>
    </n-scrollbar>
  </div>
</template>

<style lang="scss" scope>
.edge-menu-logo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  .edge-menu-logo {
    width: 40px;
    height: 40px;
  }
}
.edge-menu-box {
  height: calc(100vh - 60px);
  width: 90px;
  .edge-menu-item {
    text-align: center;
    cursor: pointer;
    border-radius: 6px;
    padding: 8px 0;
    margin: 0 8px 20px;
    &:hover {
      background-color: #F3F3F5;
    }
    .edge-menu-label {
      font-size: 1.4rem;
      color: rgb(51, 54, 57);
    }
  }
  .edge-menu-active {
    background-color: #EAF3FD;
    color: #3291F5;
    .edge-menu-label {
      font-size: 1.4rem;
      color: #3291F5;
    }
  }
}
</style>
