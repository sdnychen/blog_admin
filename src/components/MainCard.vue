<script lang="ts" setup>
import { ref, useSlots } from "vue"

const slots = useSlots()

const hasTitleSlot = ref(!!slots.title)
</script>

<template>
    <div class="main-card-box">
        <div class="main-card-box-title">
            <slot name="title" />
        </div>
        <n-divider v-if="hasTitleSlot" />
        <div class="main-card-box-content">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scope>
.main-card-box {
    display: flex;
    flex-direction: column;
    padding: $card-box-padding;
    background-color: getColor(main-bg-color);
    border-radius: $card-box-radius;
    // .main-card-box-title {

    // }
    // .main-card-box-content {

    // }
}
</style>
