<script lang="ts" setup>
import { ref, onMounted, defineProps, useSlots } from "vue"

defineProps({
    topBoxHeight: String
})

const topBarRef = ref()
const topBarHeight = ref<string>("0px")
onMounted(() => topBarHeight.value = !!useSlots().default ? topBarRef.value.clientHeight + "px" : "0px")
</script>

<template>
    <div ref="topBarRef" class="data-table-topbar">
        <slot />
    </div>
    <div>
        <n-data-table
            remote
            flex-height
            scroll-x
            v-bind="$attrs"
        />
    </div>
</template>

<style lang="scss" scope>
.data-table-topbar {
    padding-bottom: 10px;
}
.n-data-table {
    height: calc($content-height - v-bind(topBoxHeight) - 2 * $card-box-padding - $layout-gap - v-bind(topBarHeight));
}
</style>
