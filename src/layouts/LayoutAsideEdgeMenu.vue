<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue'
import { useMenuStore } from '@/stores/menu'
import { useRouter, type RouteRecordRaw } from 'vue-router'

const menuStore = useMenuStore()
const router = useRouter()

const currentRoute = computed(() => router.currentRoute.value.matched[0].path)

// 菜单列表（路由）
const menuOptions = computed(() => menuStore.routes.filter(item => item.meta.show !== false))

// 活动菜单
const activeMenu = ref(null)

// 切换导航
const navigateMenu = (route: RouteRecordRaw) => {
    activeMenu.value = route.path
    menuStore.subMenuOptions = menuStore.generateSubMenu(null, route.path)
}

onMounted(() => {
    activeMenu.value = currentRoute.value
    menuStore.subMenuOptions = menuStore.generateSubMenu(null, activeMenu.value)
})
</script>

<template>
    <div class="edge-menu-box">
        <div class="edge-menu-logo-box">
            <img class="edge-menu-logo" src="/favicon.ico" alt="logo">
        </div>

        <n-scrollbar class="edge-menu-box">
            <div
                v-for="item in menuOptions" :key="item.name"
                :class="['edge-menu-item', activeMenu === item.path ? 'edge-menu-active' : '']"
                @click="navigateMenu(item)"
            >
                <NIcon v-if="item.meta?.icon" :component="item.meta.icon" size="20" />
                <div class="edge-menu-label" v-text="item.meta?.title" />
            </div>
        </n-scrollbar>
    </div>
</template>

<style lang="scss" scoped>
.edge-menu-logo-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: $edge-menu-logo-box-height;

    .edge-menu-logo {
        width: $edge-menu-logo-width;
        height: $edge-menu-logo-height;
    }
}

.edge-menu-box {
    height: calc(100vh - 60px);

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
