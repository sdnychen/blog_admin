<script lang="ts" setup>
import {h, ref, reactive, onMounted} from 'vue'
import { NTime, NButton, NImage, NTag, useDialog } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import articleApi from '@/api/apis/articleApi'
import { ArticleStatusEnum, articleStatusList, getType} from '@/enum/ArticleStatusEnum'
import DeletedEnum from '@/enum/DeletedEnum'
import DataTable from '@/components/DataTable.vue'
import SearchCard from '@/components/SearchCard.vue'
import DatePicker from "@/components/DatePicker.vue";
import { useRouter } from "vue-router";

const dialog = useDialog()
const router = useRouter()

const queryForm = ref<ArticleQueryParam>({
    page: 1,
    title: null,
    status: null,
    publishTime: null,
    updateTime: null,
    createTime: null
})
const queryFormInit = ref<ArticleQueryParam>({
    page: 1,
    title: null,
    status: null,
    publishTime: null,
    updateTime: null,
    createTime: null
})

const total = ref<number>(0)
const dataList = ref<ArticleDataType[]>([])
const articleListLoading = ref<boolean>(false)

const getList = async () => {
    const queryParam: ArticleQueryParam = {...queryForm.value}
    if (queryParam.publishTime?.length === 2) {
        queryParam.startPublishTime = queryParam.publishTime[0]
        queryParam.endPublishTime = queryParam.publishTime[1]
    }
    if (queryParam.updateTime?.length === 2) {
        queryParam.startUpdateTime = queryParam.updateTime[0]
        queryParam.endUpdateTime = queryParam.updateTime[1]
    }
    if (queryParam.createTime?.length === 2) {
        queryParam.startCreateTime = queryParam.createTime[0]
        queryParam.endCreateTime = queryParam.createTime[1]
    }
    queryParam.publishTime = void 0
    queryParam.updateTime = void 0
    queryParam.createTime = void 0

    articleListLoading.value = true
    const { data } = await articleApi.list(queryParam)
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

// 添加
const onOpenArticleEditHandle = () => {
    router.push({name: 'ArticleCreate'})
}
// 编辑
const onEditHandle = (id: string) => {
    router.push({name: 'ArticleEdit', params: {id, a: 1}})
}
// 发布/取消发布
const onChangeStatusHandle = async (row: ArticleDataType) => {
    const {success} = await articleApi.updateStatus({
        id: row.id as string,
        status: row.status === ArticleStatusEnum['已发布'] ? ArticleStatusEnum['未发布'] : ArticleStatusEnum['已发布']
    })
    success && await getList()
}
// 删除
const onDeleteHandle = (row: ArticleDataType) => {
    dialog.warning({
        title: '删除警告',
        content: '确定删除？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
            const { success } = await articleApi.deleteRecovery({
                id: row.id as string,
                deleted: DeletedEnum['已删除']
            })
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
    {title: '别名', key: 'alias', minWidth: 100},
    {
        title: '状态', key: 'status', align: 'center', width: 100,
        render: (row) => h(NTag, {type: getType(row.status), bordered: false}, ArticleStatusEnum[row.status])
    },
    {title: '备注', key: 'remark', minWidth: 180},
    {
        title: '更新时间', key: 'updateTime', width: 180,
        render: (row) => h(NTime, {time: new Date(row.updateTime as string)})
    },
    {
        title: '发布时间', key: 'createTime', width: 180,
        render: (row) => row.status === ArticleStatusEnum['已发布'] ? h(NTime, {time: new Date(row.publishTime as string)}) : '--'
    },
    {
        title: '创建时间', key: 'createTime', width: 180,
        render: (row) => h(NTime, {time: new Date(row.createTime as string)})
    },
    {
        title: '操作', key: 'operation', fixed: 'right', width: 180,
        render: (row) => {
            let btnArr = [
                h(NButton, {text: true, type: 'info', style: {marginRight: '10px'}, onClick: () => onEditHandle(row.id as string)}, () => '修改'),
                h(NButton, {text: true, type: 'info', style: {marginRight: '10px'}, onClick: () => onChangeStatusHandle(row)}, () => '发布'),
                h(NButton, {text: true, type: 'error', onClick: () => onDeleteHandle(row)}, () => '删除')
            ]
            if (row.status === ArticleStatusEnum['已发布']) {
                btnArr = [
                    h(NButton, {text: true, type: 'info', style: {marginRight: '10px'}, onClick: () => onChangeStatusHandle(row)}, () => '取消发布')
                ]
            }
            return btnArr
        }
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
                    <n-form
                        inline :model="queryForm" label-width="auto" label-placement="left"
                        :show-feedback="false"
                    >
                        <n-form-item label="文章标题">
                            <n-input v-model:value="queryForm.title" placeholder="请输入文章标题" clearable />
                        </n-form-item>
                        <n-form-item label="发布状态">
                            <n-select
                                v-model:value="queryForm.status"
                                :options="articleStatusList()"
                                placeholder="请选择发布状态"
                                clearable
                            />
                        </n-form-item>
                        <n-form-item label="发布时间">
                            <DatePicker v-model:formatted-value="queryForm.publishTime" type="datetimerange" />
                        </n-form-item>
                        <n-form-item label="更新时间">
                            <DatePicker v-model:formatted-value="queryForm.updateTime" type="datetimerange" />
                        </n-form-item>
                        <n-form-item label="创建时间">
                            <DatePicker v-model:formatted-value="queryForm.createTime" type="datetimerange" />
                        </n-form-item>
                    </n-form>
                </SearchCard>
            </template>
            <template #buttonSlot>
                <n-button type="info" @click="onOpenArticleEditHandle">新文章</n-button>
            </template>
        </DataTable>
    </div>
</template>

<style lang="scss" scoped>
</style>
