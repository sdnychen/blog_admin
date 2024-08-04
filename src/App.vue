<script lang="ts" setup>
import type { GlobalThemeOverrides } from "naive-ui"
import { zhCN, dateZhCN } from "naive-ui"

const themeOverrides: GlobalThemeOverrides = {
    common: {
        primaryColor: "#3291F5",
        primaryColorHover: "#3291F5"
    }
}
</script>

<template>
    <n-config-provider
        :theme-overrides="themeOverrides"
        :locale = zhCN
        :dateLocale = dateZhCN
    >
        <n-dialog-provider>
            <n-message-provider>
                <RouterView />
            </n-message-provider>
        </n-dialog-provider>
    </n-config-provider>
</template>

<style lang="scss" scope>
@import url("assets/style/basic.scss");
</style>
