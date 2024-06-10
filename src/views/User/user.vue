<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue"
import type { DataTableColumns } from "naive-ui"

interface TableData {
    username: string,
    email: string
}

const queryForm = ref({
    username: ""
})
const pagination = reactive({
    pageSize: 20
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
    },
    {
        username: "张三",
        email: "111"
    }
])

const topBoxRef = ref()
const topBoxRefHeight = ref<string>("0px")
onMounted(() => topBoxRefHeight.value = topBoxRef.value.clientHeight + "px")
</script>

<template>
    <div class="content-layout">
        <div ref="topBoxRef" class="top-box-ref">
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
        </div>
        <div>
            <MainCard>
                <c-n-data-table
                    :columns="columns"
                    :data="dataList"
                    :pagination="pagination"
                    :bordered="true"
                    :top-box-height="topBoxRefHeight"
                >
                    <div>
                        <n-button type="info">添加</n-button>
                    </div>
                </c-n-data-table>
            </MainCard>
        </div>
    </div>
</template>

<style lang="scss" scope>
.content-layout {
    display: flex;
    flex-direction: column;
    gap: $layout-gap
}
</style>
