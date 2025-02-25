<script lang="ts" setup>
import { h, ref, reactive, onMounted } from 'vue'
import { NTime, NButton, NImage, useDialog } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import articleApi from '@/api/apis/articleApi'
import DeletedEnum from '@/enum/DeletedEnum'
import DataTable from '@/components/DataTable.vue'
import SearchCard from '@/components/SearchCard.vue'
import DatePicker from "@/components/DatePicker.vue";

const dialog = useDialog()

const queryForm = ref<ArticleQueryParam>({
    page: 1,
    title: '',
    createTime: null,
    deleteTime: null
})
const queryFormInit = ref<ArticleQueryParam>({
    page: 1,
    title: '',
    createTime: null,
    deleteTime: null
})
const total = ref<number>(0)
const dataList = ref<ArticleDataType[]>([])
const articleListLoading = ref<boolean>(false)

const getList = async () => {
    const queryParam: ArticleQueryParam = {...queryForm.value}
    if (queryParam.deleteTime?.length === 2) {
        queryParam.startDeleteTime = queryParam.deleteTime[0]
        queryParam.endDeleteTime = queryParam.deleteTime[1]
    }
    if (queryParam.createTime?.length === 2) {
        queryParam.startCreateTime = queryParam.createTime[0]
        queryParam.endCreateTime = queryParam.createTime[1]
    }
    queryParam.deleteTime = void 0
    queryParam.createTime = void 0

    articleListLoading.value = true
    const { data } = await articleApi.recycleBinList(queryParam)
    articleListLoading.value = false
    dataList.value = data.list
    total.value = data.total
}

// 搜索
const searchHandle = () => {
    queryForm.value.page = 1
    getList()
}
// 重置
const resetHandle = () => {
    queryForm.value = { ...queryFormInit.value }
    getList()
}

// 还原恢复
const onRecoveryHandle = async (id: string) => {
    const { success } = await articleApi.deleteRecovery({
        id: id,
        deleted: DeletedEnum['未删除']
    })
    if (success) await getList()
}
// 彻底删除
const onDeleteHandle = (id: string) => {
    dialog.warning({
        title: '永久删除警告',
        content: '永久删除后不可恢复，确定永久删除？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
            const { success } = await articleApi.delete({id})
            if (success) await getList()
        }
    })
}

const columns = reactive<DataTableColumns<ArticleDataType>>([
    {title: '标题', key: 'title', fixed: 'left', width: 200, ellipsis: {tooltip: true}},
    {
        title: '首图', key: 'img', align: 'center', width: 60,
        render: (row) => row.img ? h(NImage, {width: 30, height: 30, lazy: true, src: row.img, style: {borderRadius: '8px'}}) : '--'
    },
    {title: '摘要', key: 'intro', minWidth: 200},
    {title: '备注', key: 'remark', minWidth: 180},
    {
        title: '创建时间', key: 'createTime', width: 180,
        render: (row) => h(NTime, {time: new Date(row.createTime as string)})
    },
    {
        title: '删除时间', key: 'deleteTime', width: 180,
        render: (row) => h(NTime, {time: new Date(row.deleteTime as string)})
    },
    {
        title: '操作', key: 'operation', fixed: 'right', width: 140,
        render: (row) => [
            h(NButton, {text: true, type: 'info', style: {marginRight: '10px'}, onClick: () => onRecoveryHandle(row.id as string)}, () => '恢复'),
            h(NButton, {text: true, type: 'error', onClick: () => onDeleteHandle(row.id as string)}, () => '彻底删除')
        ]
    }
])

onMounted(() => {
    getList()
})
</script>

<template>
    <div class="content-layout" style="position: relative;">
        <DataTable
            :columns="columns"
            :data="dataList"
            :loading="articleListLoading"
            :pagination="{
                page: queryForm.page,
                pageSize: 20,
                itemCount: total,
                onChange: (page: number) => {
                    queryForm.page = page
                    getList()
                }
            }"
        >
            <template #searchSlot>
                <SearchCard @search-handle="searchHandle" @reset-handle="resetHandle">
                    <n-form inline :model="queryForm" label-width="auto" label-placement="left" :show-feedback="false">
                        <n-form-item label="文章标题">
                            <n-input v-model:value="queryForm.title" placeholder="文章标题" clearable />
                        </n-form-item>
                        <n-form-item label="删除时间">
                            <DatePicker v-model:formatted-value="queryForm.deleteTime" type="datetimerange" />
                        </n-form-item>
                        <n-form-item label="创建时间">
                            <DatePicker v-model:formatted-value="queryForm.createTime" type="datetimerange" />
                        </n-form-item>
                    </n-form>
                </SearchCard>
            </template>
        </DataTable>
    </div>
</template>

<style lang="scss" scoped>
</style>
