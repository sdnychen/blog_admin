<script lang="ts" setup>
defineEmits(['search-handle', 'reset-handle'])

</script>

<template>
    <div class="search-card-box">
        <div class="search-card-content">
            <slot />
        </div>
        <div class="search-card-btn">
            <n-button type="info" @click="$emit('search-handle')">搜索</n-button>
            <n-button type="default" @click="$emit('reset-handle')">重置</n-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.search-card-box {
    display: flex;
    padding: $card-box-padding;
    background-color: getColor(main-bg-color);
    border-radius: $card-box-radius;
    .search-card-content {
        flex: 1;
        :deep(.n-form) {
            display: flex;
            flex-wrap: wrap;
            row-gap: 10px
        }
        :deep(.n-input) {
            width: 200px !important;
        }
        :deep(.n-select) {
            width: 200px !important;
        }
        :deep(.n-input--pair) {
            width: 360px !important;
        }
    }
    .search-card-btn {
        display: flex;
        gap: 10px;
        align-items: end;
    }
}
</style>
