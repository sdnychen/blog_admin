<script lang="ts" setup>
import type { MenuOption } from "naive-ui"

const menuOptions: MenuOption[] = [
  {
    label: "寻羊冒险记",
    key: "a-wild-sheep-chase"
  },
  {
    label: "舞，舞，舞",
    key: "dance-dance-dance",
    children: [
      {
        label: "饮品",
        key: "beverage",
        children: [
          {
            label: "威士忌",
            key: "whisky",
            href: "https://baike.baidu.com/item/%E5%A8%81%E5%A3%AB%E5%BF%8C%E9%85%92/2959816?fromtitle=%E5%A8%81%E5%A3%AB%E5%BF%8C&fromid=573&fr=aladdin"
          },
          {
            label: "威士忌",
            key: "whisky1",
            href: "https://baike.baidu.com/item/%E5%A8%81%E5%A3%AB%E5%BF%8C%E9%85%92/2959816?fromtitle=%E5%A8%81%E5%A3%AB%E5%BF%8C&fromid=573&fr=aladdin"
          }
        ]
      }
    ]
  }
]
</script>

<template>
  <div>
    <n-menu
      :collapsed="false"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
    />
  </div>
</template>

<style lang="scss" scope>
</style>
