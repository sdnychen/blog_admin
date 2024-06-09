<script lang="ts" setup>
import LayoutAsideEdgeMenu from "./LayoutAsideEdgeMenu.vue"
import LayoutAsideMenu from "./LayoutAsideMenu.vue"
import Header from "./Header.vue"
import TabBar from "./TabBar.vue"
import Footer from "./Footer.vue"

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
            <div class="tab-bar">
                <TabBar />
            </div>
            <div class="content">
                <RouterView />
            </div>
            <div class="footer">
                <Footer />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scope>
.layout {
    display: flex;
    width: 100vw;
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
            width: $edge-menu-width;
            border-right: 1px solid #F5F5F5;
        }

        .menu {
            width: calc($aside-width - 90px);
        }
    }
}

.layout-right {
    width: calc(100vw - $aside-width - $layout-gap * 2);
    display: flex;
    flex-direction: column;
    gap: $layout-gap;
    margin: 0 $layout-gap;

    .header {
        height: $header-height;
        background-color: getColor(main-bg-color);
        border-radius: 0 0 $header-box-radius $header-box-radius;
    }

    .tab-bar {
        height: $tabbar-height;
        width: 100%;
    }

    .content {
        height: $content-height;
        border-radius: $content-box-radius;
    }

    .footer {
        height: $fotter-height;
        background-color: getColor(main-bg-color);
        border-radius: $fotter-box-radius;
    }
}
</style>
