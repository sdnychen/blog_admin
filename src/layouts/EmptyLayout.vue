<script lang="ts" setup>
import { useMenuStore } from "@/stores/menu";

const menuStore = useMenuStore();
</script>

<template>
    <RouterView v-slot="{ Component }">
        <KeepAlive :exclude="menuStore.keepAliveExcludeList">
            <component :is="Component" />
        </KeepAlive>
    </RouterView>
</template>

<style lang="scss" scoped></style>
