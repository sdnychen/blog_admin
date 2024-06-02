<script lang="ts" setup>
import LayoutAsideEdgeMenu from "./LayoutAsideEdgeMenu.vue"
import LayoutAsideMenu from "./LayoutAsideMenu.vue"
import Header from "./Header.vue"
import Tabs from "./Tabs.vue"

</script>

<template>
    <div class="layout">
      <div class="layout-left">
        <aside class="aside">
          <div class="edge-menu">
            <LayoutAsideEdgeMenu />
          </div>
          <div class="menu">
            <LayoutAsideMenu />
          </div>
        </aside>
      </div>
      <div class="layout-right">
        <div class="header">
          <Header />
        </div>
        <div class="tabs">
          <Tabs />
        </div>
        <div class="content" style="background-color: #FFF">
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
  width: 100%;
  height: 100vh;
  background-color: getColor(layout-bg-color);
}
.layout-left {
  width: $aside-width;
  display: flex;
  flex-direction: column;
  gap: $layout-gap;
  background-color: getColor(main-bg-color);
  .logo {
    height: $header-height;
  }
  .aside {
    display: flex;
    .edge-menu {
      border-right: 1px solid #F5F5F5;
    }
    .menu {
      width: 100%;
    }
  }
}
.layout-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: $layout-gap;
  margin: 0 $layout-gap;
  .header {
    height: $header-height;
    background-color: getColor(main-bg-color);
    border-radius: 0 0 $card-radius $card-radius;
  }
  .footer {
    background-color: getColor(main-bg-color);
  }
}
</style>
