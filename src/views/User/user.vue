<script lang="ts" setup>
import { reactive, ref, onMounted, h } from "vue"
import { NSwitch, NTime, NImage, NButton, useMessage } from "naive-ui"
import type { DataTableColumns, UploadFileInfo, UploadCustomRequestOptions } from "naive-ui"
import userApi from "@/api/apis/userApi"
import { avatarUpload } from "@/utils/ossUtil"
// import { UserStatus } from "@/enum/userStatus"

const message = useMessage()

type TableData = {
    username: string,
    email: string
}

type addEditForm = {
    username: string,
    mobile: string,
    email: string,
    avatar: string
}

const queryForm = ref({
    page: 1,
    username: "",
    mobile: "",
    email: ""
})
const queryFormInit = ref({
    page: 1,
    username: "",
    mobile: "",
    email: ""
})

// 状态改变
const statusChangeHandle = (value: any) => {
    console.log(value)
}

const columns = reactive<DataTableColumns>([
    {title: "用户名", key: "username", fixed: "left"},
    {title: "手机号", key: "mobile"},
    {title: "邮箱", key: "email"},
    {
        title: "头像", key: "avatar", align: "center",
        render: (row) => row.avatar ? h(NImage, {width: 30, height: 30, lazy: true, src: row.avatar as string, style: {borderRadius: "8px"}}) : "--"
    },
    {
        title: "创建时间", key: "createTime", fixed: "right",
        render: (row) => h(NTime, {time: new Date(row.createTime as string)})
    },
    {
        title: "状态", key: "status", align: "center",
        render: () => h(NSwitch, {checkedValue: 1, uncheckedValue: 0, onUpdateValue: statusChangeHandle})
    },
    {
        title: "操作", key: "operation", fixed: "right",
        render: () => [
            h(NButton, {text: true, type: "info", style: {marginRight: "8px"}}, () => "修改"),
            h(NButton, {text: true, type: "error"}, () => "删除")
        ]
    }
])
const dataList = ref<TableData[]>([])
const total = ref<number>(0)

const getList = async () => {
    const { data } = await userApi.getUserList(queryForm.value)
    dataList.value = data.list
    total.value = data.total
}

// 搜索
const searchHandle = () => {
    getList()
}
// 重置
const resetHandle = () => {
    queryForm.value = {...queryFormInit.value}
}

const addEditForm = ref({
    username: "",
    mobile: "",
    email: "",
    avatar: ""
})
const avatarFiles = ref<UploadFileInfo[]>([])
const addEditRules = reactive({

})

const showAddEditModal = ref<boolean>(false)
// 添加
const onAddHandle = () => {
    showAddEditModal.value = true
}

const topBoxRef = ref()
const topBoxRefHeight = ref<string>("0px")
onMounted(() => {
    topBoxRefHeight.value = topBoxRef.value.clientHeight + "px"
    getList()
})

// 文件上传
const fileUpload = async (option: UploadCustomRequestOptions) => {
    const oss = await avatarUpload(option.file)
    addEditForm.value.avatar = oss.url
}
const beforeFileUpload = (date: {file: UploadFileInfo, fileList: UploadFileInfo[]}) => {
    const re = new RegExp("^image/(png|jpeg)$", "g")
    if (date.file.type) {
        return re.test(date.file.type)
    }
    message.warning("头像文件格式仅支持png，jpg，jpeg")
    return false
}
</script>

<template>
    <div class="content-layout">
        <div ref="topBoxRef" class="top-box-ref">
            <SearchCard @search-handle="searchHandle" @reset-handle="resetHandle">
                <n-form
                    ref="formRef"
                    inline
                    :model="queryForm"
                    label-width="auto"
                    label-placement="left"
                    :show-feedback="false"
                    :scroll-x="1000"
                >
                    <n-form-item label="用户名">
                        <n-input v-model:value="queryForm.username" placeholder="请输入用户名" />
                    </n-form-item>
                    <n-form-item label="手机号">
                        <n-input v-model:value="queryForm.mobile" placeholder="请输入手机号" />
                    </n-form-item>
                    <n-form-item label="邮箱">
                        <n-input v-model:value="queryForm.email" placeholder="请输入邮箱" />
                    </n-form-item>
                </n-form>
            </SearchCard>
        </div>
        <div>
            <MainCard>
                <c-n-data-table
                    :columns="columns"
                    :data="dataList"
                    :bordered="true"
                    :top-box-height="topBoxRefHeight"
                    :total="total"
                >
                    <div>
                        <n-button type="info" @click="onAddHandle">添加</n-button>
                    </div>
                </c-n-data-table>
            </MainCard>
        </div>
    </div>
    <n-modal
        preset="card"
        v-model:show="showAddEditModal"
        title="添加用户"
        style="width: 600px;"
    >
        <n-form
            :model="addEditForm"
            :rules="addEditRules"
        >
            <n-form-item label="用户名">
                <n-input v-model:value="addEditForm.username" placeholder="输入用户名" />
            </n-form-item>
            <n-form-item label="手机号">
                <n-input v-model:value="addEditForm.username" placeholder="输入手机号" />
            </n-form-item>
            <n-form-item label="邮箱">
                <n-input v-model:value="addEditForm.username" placeholder="输入邮箱" />
            </n-form-item>
            <n-form-item label="头像">
                <n-upload
                    :custom-request="fileUpload"
                    v-model:file-list="avatarFiles"
                    list-type="image-card"
                    accept=".jpg, .jpeg, .png"
                    :max="1"
                    @before-upload="beforeFileUpload"
                >
                </n-upload>
            </n-form-item>
        </n-form>
        <template #footer>
            尾部
        </template>
    </n-modal>
</template>

<style lang="scss" scope>
.content-layout {
    display: flex;
    flex-direction: column;
    gap: $layout-gap
}
</style>
