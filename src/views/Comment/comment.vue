<script lang="ts" setup>
import { h, ref, reactive, onMounted } from 'vue'
import { NTime, NButton, useDialog } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import articleTagApi from '@/api/apis/articleTagApi'
import SearchCard from '@/components/SearchCard.vue'
import DataTable from '@/components/DataTable.vue'

const dialog = useDialog()

const queryForm = ref<articleTagSortQueryParam>({
    page: 1,
    observerName: '',
    targetTitle: '',
    content: '',
    status: 0,
    startSubmitTime: '',
    endSubmitTime: ''
})
const queryFormInit = ref<articleTagSortQueryParam>({
    page: 1,
    observerName: '',
    targetTitle: '',
    content: '',
    status: 0,
    startSubmitTime: '',
    endSubmitTime: ''
})
const total = ref<number>(0)

const dataList = ref<articleTagDataType[]>([])

const commentListLoading = ref<boolean>(false)

const getList = async () => {
    commentListLoading.value = true
    const { data, success } = await articleTagApi.list(queryForm.value)
    commentListLoading.value = false
    if (!success) return
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

// 删除
const onDeleteHandle = (id: string) => {
    dialog.warning({
        title: '删除警告',
        content: '确定删除？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
            const { success } = await articleTagApi.delete({id})
            success && await getList()
        }
    })
}

const columns = reactive<DataTableColumns<articleTagDataType>>([
    {title: '标签名', key: 'name', fixed: 'left', width: 140, ellipsis: {tooltip: true}},
    {
        title: '颜色', key: 'color', align: 'center', width: 100,
        render: (row) => h('div', {class: 'color-preview-box', style: {backgroundColor: row.color}, onClick: () => colorCopy(row.color)})
    },
    {
        title: '评论时间', key: 'createTime', width: 180,
        render: (row) => h(NTime, {time: new Date(row.createTime as string)})
    },
    {title: '备注', key: 'remark', minWidth: 180},
    {
        title: '操作', key: 'operation', fixed: 'right', width: 140,
        render: (row) => [
            h(NButton, {text: true, type: 'info', style: {marginRight: '10px'}, onClick: () => onEditHandle(row.id as string)}, () => '通过'),
            h(NButton, {text: true, type: 'info', style: {marginRight: '10px'}, onClick: () => onEditHandle(row.id as string)}, () => '拒绝'),
            h(NButton, {text: true, type: 'error', onClick: () => onDeleteHandle(row.id as string)}, () => '删除')
        ]
    }
])

onMounted(() => {
    getList()
})
</script>

<template>
    <div class="content-layout">
        <DataTable
            :columns="columns"
            :data="dataList"
            :loading="commentListLoading"
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
                        <n-form-item label="标签名">
                            <n-input v-model:value="queryForm.name" placeholder="标签名" clearable />
                        </n-form-item>
                    </n-form>
                </SearchCard>
            </template>
        </DataTable>
    </div>
</template>

<style lang="scss" scoped>

</style>
