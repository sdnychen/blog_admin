<script lang="ts" setup>
import { ref, reactive, watch, nextTick, onMounted, useTemplateRef } from 'vue'
import type { DropdownOption } from 'naive-ui'
import IconRender from '@/utils/IconRender'
import { useRouter } from 'vue-router'
import {
    Options,
    ChevronBack,
    ChevronForward,
    Reload,
    ArrowBack,
    ArrowForward,
    Close
} from '@vicons/ionicons5'

const router = useRouter()

interface tabItem {
    title: string,
    name: string,
    path: string,
    closeable: boolean
}

// 获取tab-content元素
const contentRef = useTemplateRef<HTMLInputElement>('content_ref')
const showArrow = ref<boolean>(false)
// 计算是否显示两侧左右按钮
const computedShowArrow = () => {
    if (!contentRef.value) return
    showArrow.value = contentRef.value?.scrollWidth > contentRef.value?.clientWidth
}

const tabsArray = ref<tabItem[]>([
    {
        title: '首页',
        name: 'Welcome',
        path: '/home',
        closeable: false
    }
])

// 右击菜单项
const itemMenuList = reactive<DropdownOption[]>([
    {
        label: '刷新',
        key: 'reload',
        icon: IconRender(Reload)
    },
    {
        type: 'divider',
        key: 'd1'
    },
    {
        label: '关闭其他',
        key: 'closeOther',
        icon: IconRender(Close)
    },
    {
        label: '关闭左侧',
        key: 'closeLeft',
        icon: IconRender(ArrowBack)
    },
    {
        label: '关闭右侧',
        key: 'closeRight',
        icon: IconRender(ArrowForward)
    }
])

// 当前路由
const currentActiveTab = ref<string>('Welcome')
// 切换标签
const handleSwitchTab = (key: string) => {
    router.push({ name: key })
}
// 关闭标签
const closeTab = (item: tabItem, index: number) => {
    if (item.name === currentActiveTab.value) {
        if (index + 1 < tabsArray.value.length) {
            handleSwitchTab(tabsArray.value[index + 1].name)
        } else {
            handleSwitchTab(tabsArray.value[index - 1].name)
        }
    }
    tabsArray.value.splice(index, 1)
    nextTick(() => {
        computedShowArrow()
    })
    sessionStorage.setItem('tabs', JSON.stringify(tabsArray.value))
}

// 显示隐藏菜单
const showDropdownRef = ref<boolean>(false)
// 当前点击的菜单
const rightClickTab = ref<string | null>(null)
// 右击菜单事件
const handleContextMenu = (e: MouseEvent, name: string) => {
    e.preventDefault()
    rightClickTab.value = name
    showDropdownRef.value = true
}
// 关闭菜单
const handleCloseMenu = () => {
    showDropdownRef.value = false
    rightClickTab.value = null
}
// 右击菜单功能
const handleItemMenu = (key: string, item: tabItem, index: number) => {
    switch (key) {
        case 'reload':
            console.log('reload')
            break
        case 'closeOther':
            tabsArray.value.splice(1, index - 1)
            tabsArray.value.splice(2, tabsArray.value.length)
            break
        case 'closeLeft':
            tabsArray.value.splice(1, index - 1)
            break
        case 'closeRight':
            tabsArray.value.splice(index + 1, tabsArray.value.length)
            break
    }
    computedShowArrow()
    router.push(item.path)
    handleCloseMenu()
    sessionStorage.setItem('tabs', JSON.stringify(tabsArray.value))
}

// 操作按钮下拉
const optionMenuList = reactive<DropdownOption[]>([
    {
        label: '刷新页面',
        key: 'reload',
        icon: IconRender(Reload)
    },
    {
        label: '关闭全部',
        key: 'closeAll',
        icon: IconRender(Close)
    }
])
// 操作按钮功能
const handleOptionMenu = (key: string) => {
    switch (key) {
        case 'reload':
            location.reload()
            break
        case 'closeAll':
            tabsArray.value.splice(1, tabsArray.value.length)
            break
    }
    computedShowArrow()
    router.push(tabsArray.value[0].path)
    sessionStorage.setItem('tabs', JSON.stringify(tabsArray.value))
}

// 左右箭头
const contentScrollHandle = (type: string) => {
    if (!contentRef.value) return
    type === 'left' ? contentRef.value.scrollLeft -= 100 : contentRef.value.scrollLeft += 100
}

// 检测页面是否已打开
const checkOpen = (name: string): boolean => {
    return tabsArray.value.some(item => item.name === name)
}
// 监听路由变化
watch(() => router.currentRoute.value, (newValue, oldValue) => {
    if (!oldValue && sessionStorage.getItem('tabs')) {
        tabsArray.value = JSON.parse(sessionStorage.getItem('tabs') as string)
    }
    if (newValue.name === oldValue?.name) {
        return
    }
    if (checkOpen(newValue.name as string)) {
        handleSwitchTab(newValue.name as string)
    } else {
        tabsArray.value.push({
            title: newValue.meta.title as string,
            name: newValue.name as string,
            path: newValue.fullPath,
            closeable: true
        })
    }
    sessionStorage.setItem('tabs', JSON.stringify(tabsArray.value))
    nextTick(() => {
        computedShowArrow()
        currentActiveTab.value = newValue.name as string
    })
}, { immediate: true })
const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
onMounted(() => {
    window.onresize = () => {
        return (() => {
            screenWidth.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        })()
    }
})
watch(() => screenWidth.value, () => {
    computedShowArrow()
})
</script>

<template>
    <div class="tabs-bar">
        <div class="tab-left-box">
            <div v-if="showArrow" class="previous-btn" @click="contentScrollHandle('left')">
                <NIcon :component="ChevronBack" size="20" />
            </div>
            <div ref="content_ref" class="tab-content">
                <div
                    v-for="(item, index) in tabsArray" :key="item.name"
                    class="tab-item" @contextmenu="handleContextMenu($event, item.name)"
                >
                    <n-dropdown
                        :options="itemMenuList" :show="showDropdownRef && rightClickTab === item.name"
                        @select="handleItemMenu($event, item, index)" @clickoutside="handleCloseMenu"
                    >
                        <div :class="['tab-item-content', currentActiveTab === item.name ? 'active' : '']">
                            <div class="title" @click="handleSwitchTab(item.name)">{{ item.title }}</div>
                            <div class="icon" @click="closeTab(item, index)">
                                <NIcon v-if="item.closeable" :component="Close" size="18" :depth="3" />
                            </div>
                        </div>
                    </n-dropdown>
                </div>
            </div>
            <div v-if="showArrow" class="next-btn" @click="contentScrollHandle('right')">
                <NIcon :component="ChevronForward" size="20" />
            </div>
        </div>
        <div class="tab-right-box">
            <n-dropdown trigger="click" :options="optionMenuList" @select="handleOptionMenu">
                <div class="tab-right-btn">
                    <NIcon :component="Options" size="20" />
                </div>
            </n-dropdown>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.tabs-bar {
    min-width: 100%;
    max-width: 100%;
    height: 100%;
    display: flex;
    .n-icon {
        cursor: pointer;
    }
}

.tab-left-box {
    width: calc(100% - $tab-bar-height - $tab-item-gap);
    height: 100%;
    display: flex;

    // 上一页和下一页按钮
    .previous-btn,
    .next-btn {
        min-width: $tab-bar-height;
        max-width: $tab-bar-height;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: $tab-bar-radius;
        background-color: #FFF;
    }

    .previous-btn {
        margin-right: $tab-item-gap;
    }

    .next-btn {
        margin-left: $tab-item-gap;
    }

    // 标签内容区域
    .tab-content {
        display: flex;
        gap: $tab-item-gap;
        white-space: nowrap;
        width: 100%;
        overflow-x: auto;
        &::-webkit-scrollbar {
            display: none
        };
        .tab-item {
            background-color: #FFF;
            height: 100%;
            padding-left: 14px;
            padding-right: 14px;
            border-radius: $tab-bar-radius;
            font-size: 1.3rem;
            cursor: pointer;
        }

        .tab-item-content {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .icon {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 4px;
            }
        }

        .active {
            color: $main-color;
        }
    }
}

.tab-right-box {
    cursor: pointer;
    .tab-right-btn {
        background-color: #FFF;
        border-radius: $tab-bar-radius;
        width: $tab-bar-height;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: $tab-item-gap;
    }
}
</style>
