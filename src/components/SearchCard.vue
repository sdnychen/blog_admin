<script lang="ts" setup>
</script>

<template>
    <div class="search-card-box">
        <div class="search-card-content">
            <slot />
        </div>
        <div class="search-card-btn">
            <n-button type="info">搜索</n-button>
            <n-button type="default">重置</n-button>
        </div>
    </div>
</template>

<style lang="scss" scope>
.search-card-box {
    display: flex;
    padding: $card-box-padding;
    background-color: getColor(main-bg-color);
    border-radius: $card-box-radius;
    .search-card-content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .search-card-btn {
        display: flex;
        gap: 10px;
    }
}
</style>
