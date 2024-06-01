<script lang="ts" setup>
// import LayoutMenu1 from "./LayoutAsideMenu1.vue"
import LayoutMenu2 from "./LayoutAsideMenu2.vue"

</script>

<template>
    <div class="layout">
      <div class="left">
        <aside class="aside">
          <!-- <LayoutMenu1 /> -->
          <LayoutMenu2 />
        </aside>
      </div>
      <div class="right">
        <div class="header">
          header
        </div>
        <div class="content">
          <RouterView />
        </div>
        <div class="footer">
          footer
        </div>
      </div>
    </div>
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
  // .aside {

  // }
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
</style>./LayoutLogo.vue
