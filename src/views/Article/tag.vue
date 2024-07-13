<script lang="ts" setup>
import { h, ref, reactive, onMounted } from "vue"
import { NTime, NButton, useDialog } from "naive-ui"
import type { DataTableColumns, FormRules, FormInst } from "naive-ui"

const dialog = useDialog()

type queryFormType = {
    page: number,
    name: string
}

type TableDataType = {
    id: string,
    name: string,
    abstract: string,
    img: string,
    color: string,
    status: number,
    createTime: string
    remark: string
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
    // username: [
    //     {required: true, trigger: "blur", message: "请输入用户名"},
    //     {max: 20, trigger: ["input", "blur"], message: "用户名最大长度20个字符"}
    // ],
    // mobile: [
    //     {required: true, trigger: "blur", message: "请输入手机号"},
    //     {pattern: mobileRegExp(), trigger: ["input", "blur"], message: "手机号格式错误"}
    // ],
    // email: [
    //     {required: true, trigger: "blur", message: "请输入邮箱"},
    //     {max: 50, trigger: ["input", "blur"], message: "邮箱最大长度50个字符"},
    //     {pattern: emailRegExp(), trigger: ["input", "blur"], message: "邮箱格式错误"}
    // ],
    // password: [
    //     {required: true, trigger: "blur", message: "请输入密码"},
    //     {min: 8, trigger: ["input", "blur"], message: "密码长度至少8位"}
    // ],
    // checkPassword: [
    //     {required: true, trigger: "blur", message: "请再次输入密码"},
    //     {validator: (_rule, value) => value === addEditForm.value.password, trigger: ["input", "blur"], message: "两次密码不一致"}
    // ]
})

const dataList = ref<TableDataType[]>([])

const showAddEditModal = ref<boolean>(false)
const addEditModalType = ref<string>("")

const getList = () => {
    console.log("获取数据")
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
    showAddEditModal.value = true
}
// 编辑
const onEditHandle = async (id: string) => {
    // const { data } = await userApi.getUserDetail({id})
    // addEditForm.value = data
    // avatarFiles.value = data.avatar ? [{id: "avatarId", name: new URL(data.avatar).pathname.split("/")[2], status: "finished", url: data.avatar}] : []
    addEditModalType.value = "edit"
    showAddEditModal.value = true
    console.log(id)
}

// 删除
const onDeleteHandle = (id: string) => {
    dialog.warning({
        title: "删除警告",
        content: "确定删除？",
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: async () => {
            console.log(id)
            // const { success } = await userApi.deleteUser({id})
            // if (success) {
            //     getList()
            // }
        }
    })
}

const columns = reactive<DataTableColumns<TableDataType>>([
    { title: "标签名", key: "name", fixed: "left", minWidth: 100 },
    { title: "颜色", key: "color", minWidth: 120 },
    {
        title: "创建时间", key: "createTime", minWidth: 180,
        render: (row) => h(NTime, { time: new Date(row.createTime) })
    },
    { title: "备注", key: "remark", minWidth: 180 },
    {
        title: "操作", key: "operation", fixed: "right", minWidth: 240,
        render: (row) => [
            h(NButton, { text: true, type: "info", style: { marginRight: "10px" }, onClick: () => onEditHandle(row.id) }, () => "修改"),
            h(NButton, { text: true, type: "error", onClick: () => onDeleteHandle(row.id) }, () => "删除")
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
                // const formDate = {...addEditForm.value}
                // formDate.checkPassword = void 0
                // formDate.password = sha256(formDate.password)
                // const { success } = await userApi.addUser(formDate)
                // if (success) {
                //     onCloseModalHandle()
                //     getList()
                // }
            } else if (addEditModalType.value === "edit") {
                // const { success } = await userApi.editUser(addEditForm.value)
                // if (success) {
                //     onCloseModalHandle()
                //     getList()
                // }
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
                <c-n-data-table :columns="columns" :data="dataList" :bordered="true" :top-box-height="topBoxRefHeight"
                    :total="total">
                    <div>
                        <n-button type="info" @click="onAddHandle">添加</n-button>
                    </div>
                </c-n-data-table>
            </MainCard>
        </div>
    </div>
    <n-modal preset="card" v-model:show="showAddEditModal" :title="addEditModalType === 'add' ? '添加标签' : '编辑标签'"
        :mask-closable="false" style="width: 600px;">
        <n-form ref="addEditFormRef" :model="addEditForm" :rules="addEditRules">
            <n-form-item label="标签名" path="name">
                <n-input v-model:value="addEditForm.name" placeholder="输入标签名" />
            </n-form-item>
            <n-form-item label="颜色" path="color">
                <n-color-picker v-model:value="addEditForm.color" :modes="['hex']" :show-alpha="false" />
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

<style lang="scss" scope></style>
