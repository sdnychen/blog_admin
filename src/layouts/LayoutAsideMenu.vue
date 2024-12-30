<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useMenuStore } from '@/stores/menu'
import { useRouter } from 'vue-router'
import type { MenuInst } from "naive-ui";

const menuStore = useMenuStore()
const router = useRouter()

const menuOptions = computed(() => menuStore.subMenuOptions)

// 当前菜单
const currMenu = ref<string>('')

// 切换菜单
const changeMenu = (key: string) => {
    router.push({ name: key })
    currMenu.value = key
}

// MenuRef
const menuRef = useTemplateRef<MenuInst>('menu_ref')

onMounted(() => {
    currMenu.value = router.currentRoute.value.name
    nextTick(() => {
        // 展开菜单
        menuRef.value?.showOption(currMenu.value)
    })
})
</script>

<template>
    <div class="menu-box">
        <div class="logo-box">
            <span class="logo-title">
                Admin
            </span>
        </div>
        <n-scrollbar>
            <n-menu
                ref="menu_ref" :collapsed="false" :collapsed-width="64" :collapsed-icon-size="22" :indent="20"
                :value="currMenu" :options="menuOptions" :on-update:value="changeMenu"
            />
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
