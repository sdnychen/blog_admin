<script lang="ts" setup>
import { computed, markRaw, reactive } from "vue"
import { useRouter } from "vue-router"
import { SettingsOutline, ExitOutline } from "@vicons/ionicons5"
import { useUserStore } from "@/stores/user"
import PopupMenu from "@/components/popupMenu.vue"

const router = useRouter()
const userStore = useUserStore()

const breadcrumbList = computed(() => {
  return router.currentRoute.value.matched
})

// 退出登录
const HandleLogout = () => {
  userStore.logout()
  router.replace({name: "Login"})
}

const menuList = reactive<popupMenu[]>([
  {
    label: "个人设置",
    icon: markRaw(SettingsOutline),
    callback: null,
    disable: false
  },
  {
    label: "退出登录",
    icon: markRaw(ExitOutline),
    callback: HandleLogout,
    disable: false
  }
])
</script>

<template>
  <div class="layout-header-box">
    <div class="layout-header layout-header-left">
      <n-breadcrumb>
        <n-breadcrumb-item v-for="item in breadcrumbList" :key="item.name">
          <NIcon v-if="item.meta?.icon" :component="item.meta.icon" size="16" style="margin-right: 6px;"/>
          <RouterLink :to="item.path">{{ item.meta.title }}</RouterLink>
        </n-breadcrumb-item>
      </n-breadcrumb>
    </div>
    <div class="layout-header layout-header-center"></div>
    <div class="layout-header layout-header-right">
      <div class="layout-header-button-box"></div>
      <div class="layout-header-avatar-box">
        <n-avatar
          round
          size="medium"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
        <div class="user-menu">
          <PopupMenu :data="menuList" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scope>
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
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  // .layout-header-button-box {

  // }
  .layout-header-avatar-box {
    height: 40px;
    position: relative;
  // 头像
    .n-avatar {
      cursor: pointer;
    }
    &:hover .user-menu{
      @include animation-visibility(true);
    }
    .user-menu {
      @include animation-visibility(false);
      position: absolute;
      top: 40px;
      right: -20px;
    }
  }
</style>
