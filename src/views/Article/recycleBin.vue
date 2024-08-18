<script lang="ts" setup>
import { h, ref, reactive, onMounted } from "vue"
import { NTime, NButton, NImage, useDialog } from "naive-ui"
import type { DataTableColumns } from "naive-ui"
import articleApi from "@/api/apis/articleApi"
import DeletedEnum from "@/enum/DeletedEnum"

const dialog = useDialog()

type queryFormType = {
    page: number,
    title: string,
    status: number | null,
    deleted: number,
    publishTime: string | undefined,
    createTime: string
}

const queryForm = ref<queryFormType>({
    page: 1,
    title: "",
    status: null,
    deleted: 2,
    publishTime: "",
    createTime: ""
})
const queryFormInit = ref<queryFormType>({
    page: 1,
    title: "",
    status: null,
    deleted: 2,
    publishTime: "",
    createTime: ""
})
const total = ref<number>(0)
const dataList = ref<ArticleRequestType[]>([])
const articleListLoading = ref<boolean>(false)

const getList = async () => {
    articleListLoading.value = true
    const { data } = await articleApi.recycleBinList(queryForm.value)
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
const onRecoveryHandle = async (id: String) => {
    const { success } = await articleApi.deleteRecovery({
        id: id,
        deleted: DeletedEnum["未删除"]
    })
    success && getList()
}
// 彻底删除
const onDeleteHandle = (id: String) => {
    dialog.warning({
        title: "永久删除警告",
        content: "永久删除后不可恢复，确定永久删除？",
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: async () => {
            const { success } = await articleApi.delete({id})
            success && getList()
        }
    })
}

const columns = reactive<DataTableColumns<ArticleRequestType>>([
    {title: "标题", key: "title", fixed: "left", width: 200, ellipsis: {tooltip: true}},
    {
        title: "首图", key: "img", align: "center", width: 60,
        render: (row) => row.img ? h(NImage, {width: 30, height: 30, lazy: true, src: row.img, style: {borderRadius: "8px"}}) : "--"
    },
    {title: "摘要", key: "intro", minWidth: 200},
    {title: "备注", key: "remark", minWidth: 180},
    {
        title: "创建时间", key: "createTime", width: 180,
        render: (row) => h(NTime, {time: new Date(row.createTime)})
    },
    {
        title: "删除时间", key: "deleteTime", width: 180,
        render: (row) => h(NTime, {time: new Date(row.deleteTime)})
    },
    {
        title: "操作", key: "operation", fixed: "right", width: 140,
        render: (row) => [
            h(NButton, {text: true, type: "info", style: {marginRight: "10px"}, onClick: () => onRecoveryHandle(row.id)}, () => "恢复"),
            h(NButton, {text: true, type: "error", onClick: () => onDeleteHandle(row.id)}, () => "彻底删除")
        ]
    }
])

const topBoxRef = ref()
const topBoxRefHeight = ref<string>("0px")
onMounted(() => {
    topBoxRefHeight.value = topBoxRef.value.clientHeight + "px"
    getList()
})
</script>

<template>
    <div class="content-layout" style="position: relative;">
        <div ref="topBoxRef" class="top-box-ref">
            <SearchCard @search-handle="searchHandle" @reset-handle="resetHandle">
                <n-form ref="formRef" inline :model="queryForm" label-width="auto" label-placement="left"
                    :show-feedback="false">
                    <n-form-item label="文章标题">
                        <n-input v-model:value="queryForm.title" placeholder="文章标题" clearable />
                    </n-form-item>
                </n-form>
            </SearchCard>
        </div>
        <div>
            <MainCard>
                <c-n-data-table
                    :columns="columns"
                    :data="dataList"
                    :top-box-height="topBoxRefHeight"
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
                />
            </MainCard>
        </div>
    </div>
</template>

<style lang="scss" scope>
</style>
