<script lang="ts" setup>
import { reactive } from "vue"
import {
  Menu,
  ChevronBack,
  ChevronForward,
  CloseOutline
} from "@vicons/ionicons5"

interface tabItem {
  title: string,
  name: string,
  path: string,
  closeable: Boolean
}

const tabsArray = reactive<tabItem[]>([
  {
    title: "菜单1",
    name: "Menu1",
    path: "/menu1",
    closeable: false
  },
  {
    title: "菜单2",
    name: "Menu2",
    path: "/menu2",
    closeable: true
  },
  {
    title: "菜单1113",
    name: "Menu3",
    path: "/menu3",
    closeable: true
  },
  {
    title: "菜单3",
    name: "Menu3",
    path: "/menu3",
    closeable: true
  },
  {
    title: "菜单3",
    name: "Menu3",
    path: "/menu3",
    closeable: true
  },
  {
    title: "菜单3",
    name: "Menu3",
    path: "/menu3",
    closeable: true
  },
  {
    title: "菜单3",
    name: "Menu3",
    path: "/menu3",
    closeable: true
  },
  {
    title: "菜单3",
    name: "Menu3",
    path: "/menu3",
    closeable: true
  },
  {
    title: "菜单3",
    name: "Menu3",
    path: "/menu3",
    closeable: true
  },
  {
    title: "菜单3",
    name: "Menu3",
    path: "/menu3",
    closeable: true
  },
  // {
  //   title: "菜单3",
  //   name: "Menu3",
  //   path: "/menu3",
  //   closeable: true
  // },
  // {
  //   title: "菜单3",
  //   name: "Menu3",
  //   path: "/menu3",
  //   closeable: true
  // },
  // {
  //   title: "菜单3",
  //   name: "Menu3",
  //   path: "/menu3",
  //   closeable: true
  // },
  {
    title: "菜单3",
    name: "Menu3",
    path: "/menu3",
    closeable: true
  }
])
</script>

<template>
  <div class="tabs-bar">
    <div class="tab-left-box">
      <div v-if="true" class="previous-btn"><NIcon :component="ChevronBack" size="20" /></div>
      <div class="tab-content-visible">
        <div class="tab-content-all">
          <div v-for="item in tabsArray" :key="item.name" class="tab-item">
            {{ item.title }}
            <NIcon v-if="item.closeable" :component="CloseOutline" size="18" :depth="3"/>
          </div>
        </div>
      </div>
      <div v-if="true" class="next-btn"><NIcon :component="ChevronForward" size="20" /></div>
    </div>
    <div class="tab-right-box">
      <div class="tab-right-btn">
        <NIcon :component="Menu" size="20" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scope>
.tabs-bar {
  display: flex;
  .n-icon {
    cursor: pointer;
  }
}
.tab-left-box {
  flex: 1;
  display: flex;
  // 上一页和下一页按钮
  .previous-btn,
  .next-btn {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  // 标签内容区域
  .tab-content-visible {
    flex: 1;
    overflow: hidden;
    .tab-content-all {
      display: flex;
      gap: 10px;
      overflow: hidden;
    }
    .tab-item {
      background-color: #FFF;
      height: 30px;
      padding-left: 14px;
      padding-right: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      border-radius: 4px;
      font-size: 1.3rem;
      white-space: nowrap;
    }
  }
}
.tab-right-box {
  .tab-right-btn {
    background-color: #FFF;
    border-radius: 2px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
