<script setup lang="ts">
import { useRoute } from "vue-router";
import ArticleEdit from '@/components/ArticleEdit.vue'

const route = useRoute()

console.log('route', route.params)
</script>

<template>
    <ArticleEdit
        :id="route.params.id"
        type="edit"
    />
</template>

<style scoped lang="scss">

</style>