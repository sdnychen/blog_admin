<script lang="ts" setup>
import { reactive, ref } from "vue"
import type { DataTableColumns } from "naive-ui"
import SearchCard from "@/components/SearchCard.vue"
import MainCard from "@/components/MainCard.vue"

interface TableData {
    username: string,
    email: string
}

const queryForm = ref({
    username: ""
})
const columns = reactive<DataTableColumns>([
    {
        title: "用户名",
        key: "username"
    },
    {
        title: "Email",
        key: "email"
    }
])
const dataList = ref<TableData[]>([
    {
        username: "张三",
        email: "111"
    },
    {
        username: "李四",
        email: "222"
    }
])
</script>

<template>
    <div class="content-layout">
        <SearchCard>
            <n-form
                ref="formRef"
                inline
                :model="queryForm"
                label-width="auto"
                label-placement="left"
                :show-feedback="false"
            >
                <n-form-item label="名称">
                    <n-input v-model:value="queryForm.username" placeholder="输入名称" />
                </n-form-item>
            </n-form>
        </SearchCard>
        <MainCard>
            <n-data-table
                :columns="columns"
                :data="dataList"
                :pagination="false"
                :bordered="true"
                style="min-height: 100px;"
            />
        </MainCard>
    </div>
</template>

<style lang="scss" scope>
.content-layout {
    display: flex;
    flex-direction: column;
    gap: $layout-gap
}
</style>
