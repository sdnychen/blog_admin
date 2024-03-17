<script lang="ts" setup>
</script>

<template>
  <div class="logo-box">
    <span class="logo-img">
      <img src="/public/favicon.ico" alt="">
    </span>
    <span class="logo-title">
      Admin
    </span>
  </div>
</template>

<style lang="scss" scope>
.logo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 100%;
  .logo-img {
    img {
      display: block;
      width: 40px;
    }
  }
  .logo-title {
    position: relative;
    top: -2px;
    font-size: 3rem;
  }
}
</style>
