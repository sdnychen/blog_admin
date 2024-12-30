<script lang="ts" setup>
import {h, ref, reactive, onMounted, onActivated} from 'vue'
import {NTime, NButton, useDialog, NTag} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import commentArticleApi from '@/api/apis/commentArticleApi'
import SearchCard from '@/components/SearchCard.vue'
import DataTable from '@/components/DataTable.vue'
import DatePicker from "@/components/DatePicker.vue";
import {CommentStatusEnum, getType} from "@/enum/CommentStatusEnum";

const dialog = useDialog()

const queryForm = ref<CommentArticleQueryParam>({
    page: 1,
    observerName: null,
    targetTitle: null,
    content: null,
    status: 0,
    submitTime: null,
})
const queryFormInit = ref<CommentArticleQueryParam>({
    page: 1,
    observerName: null,
    targetTitle: null,
    content: null,
    status: 0,
    submitTime: null,
})
const total = ref<number>(0)
const dataList = ref<CommentArticleDataType[]>([])
const commentListLoading = ref<boolean>(false)

const getList = async () => {
    const queryParam: CommentArticleQueryParam = {...queryForm.value}
    queryParam.status = activeTabValue.value === 0 ? 0 : null;
    if (queryParam.submitTime?.length === 2) {
        queryParam.startSubmitTime = queryParam.submitTime[0]
        queryParam.endSubmitTime = queryParam.submitTime[1]
    }
    queryParam.submitTime = void 0
    commentListLoading.value = true
    const { data, success } = await commentArticleApi.list(queryParam)
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
            const { success } = await commentArticleApi.delete({id})
            success && await getList()
        }
    })
}

// 标签
const activeTabValue = ref(0)
const switchTabs = e => {
    activeTabValue.value = e
    getList()
}

// 审核
const onReviewHandle = async (id, status) => {
    const { success } = await commentArticleApi.review({id, status})
    success && await getList()
}

const columns = reactive<DataTableColumns<CommentArticleDataType>>([
    {title: '评论者', key: 'observerName', fixed: 'left', width: 140, ellipsis: {tooltip: true}},
    {title: '评论文章', key: 'targetTitle', width: 200, ellipsis: {tooltip: true}},
    {
        title: '评论时间', key: 'submitTime', width: 180,
        render: (row) => h(NTime, {time: new Date(row.submitTime as string)})
    },
    {title: '评论内容', key: 'content', minWidth: 180, ellipsis: {tooltip: true}},
    {
        title: '审核状态', key: 'status', align: 'center', width: 100,
        render: (row) => h(NTag, {type: getType(row.status), bordered: false}, CommentStatusEnum[row.status])
    },
    {title: '备注', key: 'remark', minWidth: 140, ellipsis: {tooltip: true}},
    {
        title: '操作', key: 'operation', fixed: 'right', width: 140,
        render: (row) => [
            h(NButton, {text: true, type: 'info', style: {marginRight: '10px'}, disabled: row.status !== 0, onClick: () => onReviewHandle(row.id as string, 1)}, () => '通过'),
            h(NButton, {text: true, type: 'info', style: {marginRight: '10px'}, disabled: row.status !== 0, onClick: () => onReviewHandle(row.id as string, 2)}, () => '拒绝'),
            h(NButton, {text: true, type: 'error', onClick: () => onDeleteHandle(row.id as string)}, () => '删除')
        ]
    }
])

onMounted(() => {
    getList()
})
onActivated(() => {
    console.log('onActivated')
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
                        <n-form-item label="评论者">
                            <n-input v-model:value="queryForm.observerName" placeholder="评论者" clearable />
                        </n-form-item>
                        <n-form-item label="评论文章">
                            <n-input v-model:value="queryForm.targetTitle" placeholder="评论文章" clearable />
                        </n-form-item>
                        <n-form-item label="评论内容">
                            <n-input v-model:value="queryForm.content" placeholder="评论内容" clearable />
                        </n-form-item>
                        <n-form-item label="评论时间">
                            <DatePicker v-model:formatted-value="queryForm.submitTime" type="datetimerange" />
                        </n-form-item>
                    </n-form>
                </SearchCard>
            </template>
            <template #tabsSlot>
                <n-tabs v-model:value="activeTabValue" type="line" animated @update:value="switchTabs">
                    <n-tab-pane :name="0" tab="未审核" />
                    <n-tab-pane :name="1" tab="全部" />
                </n-tabs>
            </template>
        </DataTable>
    </div>
</template>

<style lang="scss" scoped>

</style>
