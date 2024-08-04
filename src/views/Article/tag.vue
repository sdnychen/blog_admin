<script lang="ts" setup>
import { h, ref, reactive, onMounted } from "vue"
import { NTime, NButton, useDialog } from "naive-ui"
import type { DataTableColumns, FormRules, FormInst } from "naive-ui"
import articleTagApi from "@/api/apis/articleTagApi"

const dialog = useDialog()

type queryFormType = {
    page: number,
    name: string
}

type addEditFormType = {
    name: string,
    color: string,
    remark: string
}

const queryForm = ref<queryFormType>({
    page: 1,
    name: ""
})
const queryFormInit = ref<queryFormType>({
    page: 1,
    name: ""
})
const total = ref<number>(0)

const addEditForm = ref<addEditFormType>({
    name: "",
    color: "",
    remark: ""
})
const addEditFormInit = ref<addEditFormType>({
    name: "",
    color: "",
    remark: ""
})

const addEditRules = reactive<FormRules>({
    name: [
        {required: true, trigger: "blur", message: "请输入标签名"},
        {max: 20, trigger: ["input", "blur"], message: "标签名最大长度20个字符"}
    ],
    color: [
        {required: true, trigger: "blur", message: "请选择标签颜色"}
    ]
})

const dataList = ref<articleTagRequestType[]>([])

const showAddEditModal = ref<boolean>(false)
const addEditModalType = ref<string>("")
const addEditModalTitle = ref<string | null>(null)
const tagListLoading = ref<boolean>(false)

const getList = async () => {
    tagListLoading.value = true
    const { data } = await articleTagApi.list(queryForm.value)
    tagListLoading.value = false
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
const onAddHandle = () => {
    addEditModalType.value = "add"
    addEditModalTitle.value = "添加标签"
    showAddEditModal.value = true
}
// 编辑
const onEditHandle = async (id: string) => {
    const { data } = await articleTagApi.detail({id})
    addEditForm.value = data
    addEditModalType.value = "edit"
    addEditModalTitle.value = "编辑标签"
    showAddEditModal.value = true
}

// 删除
const onDeleteHandle = (id: string) => {
    dialog.warning({
        title: "删除警告",
        content: "确定删除？",
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: async () => {
            const { success } = await articleTagApi.delete({id})
            if (success) {
                getList()
            }
        }
    })
}

const columns = reactive<DataTableColumns<articleTagRequestType>>([
    {title: "标签名", key: "name", fixed: "left", width: 140, ellipsis: {tooltip: true}},
    {
        title: "颜色", key: "color", align: "center", width: 100,
        render: (row) => h("div", {class: "color-preview-box", style: {backgroundColor: row.color}, onClick: () => {
            navigator.clipboard.writeText(row.color)
        }})
    },
    {
        title: "创建时间", key: "createTime", width: 180,
        render: (row) => h(NTime, {time: new Date(row.createTime)})
    },
    {title: "备注", key: "remark", minWidth: 180},
    {
        title: "操作", key: "operation", fixed: "right", width: 120,
        render: (row) => [
            h(NButton, {text: true, type: "info", style: {marginRight: "10px"}, onClick: () => onEditHandle(row.id)}, () => "修改"),
            h(NButton, {text: true, type: "error", onClick: () => onDeleteHandle(row.id)}, () => "删除")
        ]
    }
])

const addEditFormRef = ref<FormInst | null>()
// 弹窗关闭
const onCloseModalHandle = () => {
    showAddEditModal.value = false
    addEditForm.value = { ...addEditFormInit.value }
}
// 弹窗提交
const onSubmitModalHandle = () => {
    addEditFormRef.value?.validate(async err => {
        if (!err) {
            if (addEditModalType.value === "add") {
                const { success } = await articleTagApi.add(addEditForm.value)
                if (success) {
                    onCloseModalHandle()
                    getList()
                }
            } else if (addEditModalType.value === "edit") {
                const { success } = await articleTagApi.edit(addEditForm.value)
                if (success) {
                    onCloseModalHandle()
                    getList()
                }
            }
        }
    })
}

const topBoxRef = ref()
const topBoxRefHeight = ref<string>("0px")
onMounted(() => {
    topBoxRefHeight.value = topBoxRef.value.clientHeight + "px"
    getList()
})
</script>

<template>
    <div class="content-layout">
        <div ref="topBoxRef" class="top-box-ref">
            <SearchCard @search-handle="searchHandle" @reset-handle="resetHandle">
                <n-form ref="formRef" inline :model="queryForm" label-width="auto" label-placement="left"
                    :show-feedback="false">
                    <n-form-item label="标签名">
                        <n-input v-model:value="queryForm.name" placeholder="标签名" clearable />
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
                    :loading="tagListLoading"
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
                        <n-button type="info" @click="onAddHandle">添加</n-button>
                    </div>
                </c-n-data-table>
            </MainCard>
        </div>
    </div>
    <n-modal preset="card" v-model:show="showAddEditModal" :title="addEditModalTitle"
        :mask-closable="false" style="width: 600px;">
        <n-form ref="addEditFormRef" :model="addEditForm" :rules="addEditRules">
            <n-form-item label="标签名" path="name">
                <n-input v-model:value="addEditForm.name" placeholder="输入标签名" />
            </n-form-item>
            <n-form-item label="颜色" path="color">
                <n-color-picker v-model:value="addEditForm.color" :modes="['hex']" :show-alpha="true" show-preview/>
            </n-form-item>
            <n-form-item label="备注" path="remark">
                <n-input v-model:value="addEditForm.remark" type="textarea" maxlength="255" show-count
                    placeholder="备注" />
            </n-form-item>
        </n-form>
        <template #footer>
            <div class="modal-footer">
                <n-button type="info" @click="onSubmitModalHandle">提交</n-button>
                <n-button @click="onCloseModalHandle">取消</n-button>
            </div>
        </template>
    </n-modal>
</template>

<style lang="scss" scope>
.color-preview-box {
    width: 40px;
    height: 22px;
    border-radius: 4px;
    cursor: pointer;
}
</style>
