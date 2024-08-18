<script lang="ts" setup>
import { h, ref, reactive, onMounted } from "vue"
import { NTime, NButton, NImage, NTag, useDialog } from "naive-ui"
import type { DataTableColumns } from "naive-ui"
import articleApi from "@/api/apis/articleApi"
import { ArticleStatusEnum, getType} from "@/enum/ArticleStatusEnum"
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
    const { data } = await articleApi.list(queryForm.value)
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

const currArticleId = ref<String>("")
const articleEditVisibility = ref<boolean>(false)
const articleEditType = ref<string>("add")

// 添加
const onOpenArticleEditHandle = () => {
    articleEditType.value = "add"
    articleEditVisibility.value = true
}
// 编辑
const onEditHandle = async (id: String) => {
    articleEditType.value = "edit"
    articleEditVisibility.value = true
    currArticleId.value = id
}
// 发布/取消发布
const onChangeStatusHandle = async (row: ArticleRequestType) => {
    const {success} = await articleApi.updateStatus({
        id: row.id,
        status: row.status === ArticleStatusEnum["已发布"] ? ArticleStatusEnum["未发布"] : ArticleStatusEnum["已发布"]
    })
    success && getList()
}
// 删除
const onDeleteHandle = (row: ArticleRequestType) => {
    dialog.warning({
        title: "删除警告",
        content: "确定删除？",
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: async () => {
            const { success } = await articleApi.deleteRecovery({
                id: row.id,
                deleted: DeletedEnum["已删除"]
            })
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
    {title: "别名", key: "alias", minWidth: 100},
    {
        title: "状态", key: "status", align: "center", width: 100,
        render: (row) => h(NTag, {type: getType(row.status), bordered: false}, ArticleStatusEnum[row.status])
    },
    {title: "备注", key: "remark", minWidth: 180},
    {
        title: "发布时间", key: "createTime", width: 180,
        render: (row) => row.status === ArticleStatusEnum["已发布"] ? h(NTime, {time: new Date(row.publishTime)}) : "--"
    },
    {
        title: "创建时间", key: "createTime", width: 180,
        render: (row) => h(NTime, {time: new Date(row.createTime)})
    },
    {
        title: "操作", key: "operation", fixed: "right", width: 180,
        render: (row) => {
            let btnArr = [
                h(NButton, {text: true, type: "info", style: {marginRight: "10px"}, onClick: () => onEditHandle(row.id)}, () => "修改"),
                h(NButton, {text: true, type: "info", style: {marginRight: "10px"}, onClick: () => onChangeStatusHandle(row)}, () => "发布"),
                h(NButton, {text: true, type: "error", onClick: () => onDeleteHandle(row)}, () => "删除")
            ]
            if (row.status === ArticleStatusEnum["已发布"]) {
                btnArr = [
                    h(NButton, {text: true, type: "info", style: {marginRight: "10px"}, onClick: () => onChangeStatusHandle(row)}, () => "取消发布")
                ]
            }
            return btnArr
        }
    }
])

// 编辑窗口
const onCloseArticleEditHandle = () => {
    getList()
    articleEditVisibility.value = false
}

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
                >
                    <div>
                        <n-button type="info" @click="onOpenArticleEditHandle">新文章</n-button>
                    </div>
                </c-n-data-table>
            </MainCard>
        </div>
        <ArticleEdit
            v-if="articleEditVisibility"
            :id="currArticleId"
            :type="articleEditType"
            @onCloseArticleEditHandle="onCloseArticleEditHandle"
        />
    </div>
</template>

<style lang="scss" scope>
</style>
