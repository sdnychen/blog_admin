<script lang="ts" setup>
interface popupMenuData {
  data: popupMenu[]
}

// eslint-disable-next-line no-unused-vars
defineProps<popupMenuData>()
</script>

<template>
  <div class="popup-menu">
    <div class="popup-menu-item" v-for="item in data" :key="item.label" @click="item.callback">
      <NIcon v-if="item.icon" :component="item.icon" size="16" />
      <div>{{ item.label }}</div>
    </div>
  </div>
</template>

<style lang="scss" scope>
.popup-menu {
  background-color: getColor(main-bg-color);
  padding: 4px;
  box-shadow: 0 0 6px 0 getColor(box-shadow);
  border-radius: $popup-menu-radius;
  .popup-menu-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px;
    font-size: 1.4rem;
    white-space: nowrap;
  }
  .popup-menu-item:hover {
    background-color: getColor(layout-bg-color);
  }
}
</style>
