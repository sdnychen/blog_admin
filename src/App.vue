<script lang="ts" setup>
import type { GlobalThemeOverrides } from "naive-ui"

const themeOverrides: GlobalThemeOverrides = {
    common: {
    },
    Input: {
        borderHover: "1px solid #3291F5",
        borderFocus: "1px solid #3291F5",
        boxShadowFocus: ""
    },
    Checkbox: {
        borderChecked: "1px solid #3291F5",
        borderFocus: "1px solid #3291F5",
        colorChecked: "#3291F5",
        boxShadowFocus: ""
    },
    Menu: {
        itemTextColorActive: "#3291F5",
        itemTextColorChildActive: "#3291F5",
        itemTextColorActiveHover: "#3291F5",
        itemTextColorHover: "",
        itemColorActive: "#EAF3FD",
        itemColorActiveHover: "#EAF3FD",
        itemTextColorChildActiveHover: "#3291F5",
        itemIconColorActive: "#3291F5",
        itemIconColorChildActive: "#3291F5",
        itemIconColorChildActiveHover: "#3291F5",
        itemIconColorActiveHover: "#3291F5",
        arrowColorActiveHover: "#3291F5",
        arrowColorChildActive: "#3291F5",
        arrowColorChildActiveHover: "#3291F5"
    },
    Spin: {
        color: "#3291F5"
    },
    Button: {
        textColorHover: "#3291F5",
        borderHover: "1px solid #3291F5",
        textColorFocus: "#3291F5",
        borderFocus: "1px solid #3291F5",
        rippleColor: "",
        textColorPressed: "#3291F5",
        borderPressed: "1px solid #3291F5"
    },
    Switch: {
        railColorActive: "#3291F5",
        boxShadowFocus: ""
    },
    Upload: {
        draggerBorderHover: "1px dashed #3291F5"
    }
}
</script>

<template>
    <n-config-provider :theme-overrides="themeOverrides">
        <n-message-provider>
            <RouterView />
        </n-message-provider>
    </n-config-provider>
</template>

<style lang="scss" scope>
@import url("assets/style/basic.scss");
</style>
