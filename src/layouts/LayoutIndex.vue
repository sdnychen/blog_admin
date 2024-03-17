<script lang="ts" setup>
import type { GlobalThemeOverrides } from "naive-ui"
import LayoutrLogo from "./LayoutrLogo.vue"
import LayoutMenu from "./LayoutMenu.vue"

const themeOverrides: GlobalThemeOverrides = {
  Menu: {
    itemTextColorActive: "#3291F5",
    itemTextColorChildActive: "#3291F5",
    itemTextColorActiveHover: "#3291F5",
    itemTextColorHover: "",
    itemColorActive: "#EAF3FD",
    itemColorActiveHover: "#EAF3FD",
    itemTextColorChildActiveHover: "#3291F5"
  }
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="layout">
      <div class="left">
        <div class="logo">
          <LayoutrLogo />
        </div>
        <aside class="aside">
          <LayoutMenu />
        </aside>
      </div>
      <div class="right">
        <div class="header">
          header
        </div>
        <div class="footer">
          footer
        </div>
      </div>
    </div>
  </n-config-provider>
</template>

<style lang="scss" scope>
.layout {
  display: flex;
  gap: $layout-gap;
  width: 100%;
  height: 100vh;
  background-color: getColor(layout-bg-color);
}
.left {
  width: $aside-width;
  display: flex;
  flex-direction: column;
  gap: $layout-gap;
  background-color: getColor(main-bg-color);
  .logo {
    height: $header-height;
  }
  .aside {

  }
}
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: $layout-gap;
  .header {
    height: $header-height;
    background-color: getColor(main-bg-color);
  }
  .footer {
    background-color: getColor(main-bg-color);
  }
}
</style>
