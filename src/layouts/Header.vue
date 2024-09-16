<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { SettingsOutline, ExitOutline } from '@vicons/ionicons5'
import { useUserStore } from '@/stores/user'
import type { DropdownOption } from 'naive-ui'
import IconRender from '@/utils/IconRender'

const router = useRouter()
const userStore = useUserStore()

const breadcrumbList = computed(() => {
    return router.currentRoute.value.matched
})

// 退出登录
const userMenuHandle = (key: string) => {
    if (key === 'setting') {
        console.log(key)
    } else if (key === 'logout') {
        userStore.logout()
        router.replace({ name: 'Login' })
    }
}

const userMenuList = reactive<DropdownOption[]>([
    {
        label: '个人设置',
        key: 'setting',
        icon: IconRender(SettingsOutline)
    },
    {
        label: '退出登录',
        key: 'logout',
        icon: IconRender(ExitOutline)
    }
])
</script>

<template>
    <div class="layout-header-box">
        <div class="layout-header layout-header-left">
            <n-breadcrumb>
                <n-breadcrumb-item v-for="item in breadcrumbList" :key="item.name">
                    <NIcon v-if="item.meta?.icon" :component="item.meta.icon" size="16" style="margin-right: 6px;" />
                    <RouterLink :to="item.path">{{ item.meta.title }}</RouterLink>
                </n-breadcrumb-item>
            </n-breadcrumb>
        </div>
        <div class="layout-header layout-header-center" />
        <div class="layout-header layout-header-right">
            <div class="layout-header-button-box" />
            <div class="layout-header-avatar-box">
                <n-dropdown trigger="hover" :options="userMenuList" @select="userMenuHandle">
                    <n-avatar round size="medium" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
                </n-dropdown>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.layout-header-box {
    display: flex;
    height: 100%;
    padding: 0 20px;
}

.layout-header {
    flex: 1;
    display: flex;
    align-items: center;
}

// 头部左侧
// .layout-header-left {
// }
// 头部中间
.layout-header-center {
    justify-content: center;
}

// 头部右侧
.layout-header-right {
    justify-content: end;
    position: relative;

    &>div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

// .layout-header-button-box {

// }
.layout-header-avatar-box {
    padding: 0 10px;
    cursor: pointer;
}
</style>
