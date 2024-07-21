<script lang="ts" setup>
import { reactive, ref, onMounted, h } from "vue"
import { NSwitch, NTime, NImage, NButton, useMessage, useDialog } from "naive-ui"
import type { DataTableColumns, UploadFileInfo, UploadCustomRequestOptions, FormRules, FormInst, TransferOption } from "naive-ui"
import userApi from "@/api/apis/userApi"
import userGroupApi from "@/api/apis/userGroupApi"
import authApi from "@/api/apis/authApi"
import { avatarUpload } from "@/utils/ossUtil"
import EnableDisableEnum from "@/enum/EnableDisableEnum"
import { mobileRegExp, emailRegExp } from "@/utils/regExp"
import { sha256 } from "js-sha256"
import { useUserStore } from "@/stores/user"

const message = useMessage()
const dialog = useDialog()
const userStore = useUserStore()

type TableDataType = {
    id: string,
    username: string,
    email: string,
    mibile: string,
    avatar: string,
    status: number,
    createTime: string
    remark: string
}

type addEditFormType = {
    username: string,
    mobile: string,
    email: string,
    avatar: string,
    password: string,
    checkPassword: string | undefined,
    remark: string
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
const addEditForm = ref<addEditFormType>({
    username: "",
    mobile: "",
    email: "",
    avatar: "",
    password: "",
    checkPassword: "",
    remark: ""
})
const addEditFormInit = ref<addEditFormType>({
    username: "",
    mobile: "",
    email: "",
    avatar: "",
    password: "",
    checkPassword: "",
    remark: ""
})

const showAddEditModal = ref<boolean>(false)
const showResetPasswordModal = ref<boolean>(false)
const showUserGroupAndAuthDrawer = ref<boolean>(false)
const addEditModalType = ref<string | null>(null)
const addEditModalTitle = ref<string | null>(null)
const userGroupAndAuthDrawerType = ref<string | null>(null)
const avatarFiles = ref<UploadFileInfo[]>([])
const userListLoading = ref<boolean>(false)

const userGroupValue = ref<Array<string | number>>([])
const userGroupOptions = ref<TransferOption[]>([])
const authValue = ref<Array<string | number>>([])
const authOptions = ref<TransferOption[]>([])
const currUser = ref<TableDataType | null>(null)

const dataList = ref<TableDataType[]>([])
const total = ref<number>(0)
// 用户列表
const getList = async () => {
    userListLoading.value = true
    const { data } = await userApi.getUserList(queryForm.value)
    userListLoading.value = false
    dataList.value = data.list
    total.value = data.total
}

// 状态改变
const statusChangeHandle = async (row: TableDataType, index: number) => {
    dataList.value[index].status = row.status === 1 ? 2 : 1
    await userApi.updateStatus({id: row.id, status: row.status})
    getList()
}
// 删除
const onDeleteHandle = (id: string) => {
    dialog.warning({
        title: "删除警告",
        content: "确定删除？",
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: async () => {
            const { success } = await userApi.deleteUser({id})
            if (success) {
                getList()
            }
        }
    })
}

// 全部权限
const getAuthList = async () => {
    const { data } = await authApi.getAllList()
    authOptions.value = []
    data.forEach((item: authRequestType) => {
        authOptions.value.push({
            label: item.authName,
            value: item.id,
            disabled: false
        })
    })
}
// 全部用户组
const getAllUserGroup = async () => {
    const { data } = await userGroupApi.getAllUserGroupList()
    userGroupOptions.value = []
    data.forEach((item: userGroupRequestType) => {
        userGroupOptions.value.push({
            label: item.groupName,
            value: item.id,
            disabled: false
        })
    })
}

// 用户权限
const getUserAuth = async (id: string) => {
    const { data } = await userApi.getUserAuthList({id})
    authValue.value = []
    data.forEach((item: authRequestType) => {
        authValue.value.push(item.id)
    })
}
// 用户组
const getUserGroup = async (id: string) => {
    const { data } = await userGroupApi.getUserGroupByUser({id})
    userGroupValue.value = []
    data.forEach((item: userGroupRequestType) => {
        userGroupValue.value.push(item.id)
    })
}

// 添加
const onAddHandle = () => {
    addEditModalType.value = "add"
    addEditModalTitle.value = "添加用户"
    showAddEditModal.value = true
}
// 编辑
const onEditHandle = async (id: string) => {
    const { data } = await userApi.getUserDetail({id})
    addEditForm.value = data
    avatarFiles.value = data.avatar ? [{id: "avatarId", name: new URL(data.avatar).pathname.split("/")[2], status: "finished", url: data.avatar}] : []
    addEditModalType.value = "edit"
    addEditModalTitle.value = "编辑用户"
    showAddEditModal.value = true
}
// 添加到用户组
const onAddUserGroupHandle = (user: TableDataType) => {
    getAllUserGroup()
    getUserGroup(user.id)
    currUser.value = user
    userGroupAndAuthDrawerType.value = "userGroup"
    showUserGroupAndAuthDrawer.value = true
}
// 授权
const onAuthHandle = (user: TableDataType) => {
    getAuthList()
    getUserAuth(user.id)
    currUser.value = user
    userGroupAndAuthDrawerType.value = "auth"
    showUserGroupAndAuthDrawer.value = true
}
// 重置密码
const onResetPasswordHandle = (user: TableDataType) => {
    currUser.value = user
    addEditModalType.value = "reset"
    addEditModalTitle.value = "重置密码"
    showAddEditModal.value = true
}

// 搜索
const searchHandle = () => {
    queryForm.value.page = 1
    getList()
}
// 重置
const resetHandle = () => {
    queryForm.value = {...queryFormInit.value}
    getList()
}
const addEditRules = reactive<FormRules>({
    username: [
        {required: true, trigger: "blur", message: "请输入用户名"},
        {max: 20, trigger: ["input", "blur"], message: "用户名最大长度20个字符"}
    ],
    mobile: [
        {required: true, trigger: "blur", message: "请输入手机号"},
        {pattern: mobileRegExp(), trigger: ["input", "blur"], message: "手机号格式错误"}
    ],
    email: [
        {required: true, trigger: "blur", message: "请输入邮箱"},
        {max: 50, trigger: ["input", "blur"], message: "邮箱最大长度50个字符"},
        {pattern: emailRegExp(), trigger: ["input", "blur"], message: "邮箱格式错误"}
    ],
    password: [
        {required: true, trigger: "blur", message: "请输入密码"},
        {min: 8, trigger: ["input", "blur"], message: "密码长度至少8位"}
    ],
    checkPassword: [
        {required: true, trigger: "blur", message: "请再次输入密码"},
        {validator: (_rule, value) => value === addEditForm.value.password, trigger: ["input", "blur"], message: "两次密码不一致"}
    ]
})

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
    message.warning("头像文件格式仅支持png/jpg/jpeg")
    return false
}
const removeFile = () => {
    avatarFiles.value = []
    addEditForm.value.avatar = ""
}

const addEditFormRef = ref<FormInst | null>()
// 弹窗关闭
const onCloseModalHandle = () => {
    showAddEditModal.value = false
    showResetPasswordModal.value = false
    addEditForm.value = addEditFormInit.value
}
// 弹窗提交
const onSubmitModalHandle = () => {
    addEditFormRef.value?.validate(async err => {
        if (!err) {
            if (addEditModalType.value === "add") {
                const dataForm = {...addEditForm.value}
                dataForm.checkPassword = void 0
                dataForm.password = sha256(dataForm.password)
                const { success } = await userApi.addUser(dataForm)
                if (success) {
                    onCloseModalHandle()
                    getList()
                }
            } else if (addEditModalType.value === "edit") {
                const { success } = await userApi.editUser(addEditForm.value)
                if (success) {
                    onCloseModalHandle()
                    getList()
                }
            } else if (addEditModalType.value === "reset") {
                const dataForm = {
                    id: currUser.value?.id,
                    newPassword: sha256(addEditForm.value.password)
                }
                const { success } = await userApi.resetPassword(dataForm)
                if (success) {
                    onCloseModalHandle()
                }
            }
        }
    })
}
// 抽屉关闭
const onCloseDrawerHandle = () => {
    showUserGroupAndAuthDrawer.value = false
}
// 抽屉提交
const onSubmitDrawerHandle = async () => {
    if (userGroupAndAuthDrawerType.value === "userGroup") {
        const { success } = await userApi.updateUserGroupList({
            id: currUser.value?.id,
            userGroupList: userGroupValue.value
        })
        if (success) {
            onCloseDrawerHandle()
        }
    } else {
        const { success } = await userApi.updateUserAuthList({
            id: currUser.value?.id,
            authList: authValue.value
        })
        if (success) {
            onCloseDrawerHandle()
        }
    }
    onCloseDrawerHandle()
}

const columns = reactive<DataTableColumns<TableDataType>>([
    {title: "用户名", key: "username", fixed: "left", width: 200, ellipsis: {tooltip: true} },
    {title: "手机号", key: "mobile", width: 120 },
    {title: "邮箱", key: "email", width: 200, ellipsis: {tooltip: true} },
    {
        title: "头像", key: "avatar", align: "center", width: 60,
        render: (row) => row.avatar ? h(NImage, {width: 30, height: 30, lazy: true, src: row.avatar, style: {borderRadius: "8px"}}) : "--"
    },
    {
        title: "创建时间", key: "createTime", width: 180,
        render: (row) => h(NTime, {time: new Date(row.createTime)})
    },
    {title: "备注", key: "remark", minWidth: 180, ellipsis: {tooltip: true}},
    {
        title: "状态", key: "status", align: "center", fixed: "right", width: 60,
        render: (row, index) => h(NSwitch, {checkedValue: EnableDisableEnum.ENABLE, uncheckedValue: EnableDisableEnum.DISABLE, value: row.status, onUpdateValue: () => statusChangeHandle(row, index)})
    },
    {
        title: "操作", key: "operation", fixed: "right", width: 300,
        render: (row) => [
            h(NButton, {text: true, type: "info", style: {marginRight: "10px"}, onClick: () => onEditHandle(row.id)}, () => "修改"),
            h(NButton, {text: true, type: "info", style: {marginRight: "10px"}, onClick: () => onAddUserGroupHandle(row)}, () => "添加到用户组"),
            h(NButton, {text: true, type: "info", style: {marginRight: "10px"}, onClick: () => onAuthHandle(row)}, () => "授权"),
            h(NButton, {text: true, type: "info", style: {
                display: userStore.userInfo?.id === "1" ? "inline-flex" : "none",
                marginRight: "10px"
            }, onClick: () => onResetPasswordHandle(row)}, () => "重置密码"),
            h(NButton, {text: true, type: "error", onClick: () => onDeleteHandle(row.id)}, () => "删除")
        ]
    }
])
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
                >
                    <n-form-item label="用户名">
                        <n-input v-model:value="queryForm.username" placeholder="用户名" clearable />
                    </n-form-item>
                    <n-form-item label="手机号">
                        <n-input v-model:value="queryForm.mobile" placeholder="手机号" clearable />
                    </n-form-item>
                    <n-form-item label="邮箱">
                        <n-input v-model:value="queryForm.email" placeholder="邮箱" clearable />
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
                    :loading="userListLoading"
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
    <n-modal
        preset="card"
        v-model:show="showAddEditModal"
        :title="addEditModalTitle"
        :mask-closable="false"
        style="width: 600px;"
    >
        <n-form
            ref="addEditFormRef"
            :model="addEditForm"
            :rules="addEditRules"
        >
            <n-form-item v-if="addEditModalType !== 'reset'" label="用户名" path="username">
                <n-input v-model:value="addEditForm.username" placeholder="输入用户名" />
            </n-form-item>
            <n-form-item v-if="addEditModalType !== 'reset'" label="手机号" path="mobile">
                <n-input v-model:value="addEditForm.mobile" placeholder="输入手机号" />
            </n-form-item>
            <n-form-item v-if="addEditModalType !== 'reset'" label="邮箱" path="email">
                <n-input v-model:value="addEditForm.email" placeholder="输入邮箱" />
            </n-form-item>
            <n-form-item v-if="addEditModalType !== 'edit'" label="密码" path="password">
                <n-input v-model:value="addEditForm.password" type="password" placeholder="请输入密码" />
            </n-form-item>
            <n-form-item v-if="addEditModalType === 'add'" label="确认密码" path="checkPassword">
                <n-input v-model:value="addEditForm.checkPassword" type="password" placeholder="请再次输入密码" />
            </n-form-item>
            <n-form-item v-if="addEditModalType !== 'reset'" label="头像">
                <n-upload
                    :custom-request="fileUpload"
                    v-model:file-list="avatarFiles"
                    list-type="image-card"
                    accept=".jpg, .jpeg, .png"
                    :max="1"
                    @before-upload="beforeFileUpload"
                    @remove="removeFile"
                >
                </n-upload>
            </n-form-item>
            <n-form-item v-if="addEditModalType !== 'reset'" label="备注" path="remark">
                <n-input
                    v-model:value="addEditForm.remark"
                    type="textarea"
                    maxlength="255"
                    show-count
                    placeholder="备注"
                />
            </n-form-item>
        </n-form>
        <template #footer>
            <div class="modal-footer">
                <n-button type="info" @click="onSubmitModalHandle">提交</n-button>
                <n-button @click="onCloseModalHandle">取消</n-button>
            </div>
        </template>
    </n-modal>
    <n-drawer
        v-model:show="showUserGroupAndAuthDrawer"
        :width="600"
        :close-on-esc="false"
        :mask-closable="false"
    >
        <n-drawer-content :title="userGroupAndAuthDrawerType === 'userGroup' ? '添加到用户组' : '用户授权'">
            <div class="drawer-content currUser">
                <div class="sub-title">
                    用户
                </div>
                <div class="user">
                    <span>{{ currUser?.username }}</span>
                </div>
            </div>
            <div class="drawer-content auth">
                <div class="sub-title">
                    权限
                </div>
                <n-transfer
                    v-if="userGroupAndAuthDrawerType === 'userGroup'"
                    ref="userGroupTransfer"
                    v-model:value="userGroupValue"
                    :options="userGroupOptions"
                    source-title="全部用户组"
                    target-title="已添加用户组"
                    select-all-text="全选"
                    clear-text="清除"
                    source-filter-placeholder="搜索用户组"
                    size="small"
                    :show-selected="false"
                    source-filterable
                    target-filterable
                />
                <n-transfer
                    v-else
                    ref="authTransfer"
                    v-model:value="authValue"
                    :options="authOptions"
                    source-title="全部权限"
                    target-title="已选权限"
                    select-all-text="全选"
                    clear-text="清除"
                    source-filter-placeholder="搜索权限"
                    size="small"
                    :show-selected="false"
                    source-filterable
                    target-filterable
                />
            </div>
        <template #footer>
            <div class="drawer-footer">
                <n-button type="info" @click="onSubmitDrawerHandle">提交</n-button>
                <n-button @click="onCloseDrawerHandle">取消</n-button>
            </div>
        </template>
        </n-drawer-content>
    </n-drawer>
</template>

<style lang="scss" scope>
.n-drawer {
    .drawer-content {
        margin-bottom: 20px
    }
    .sub-title {
        font-weight: 500;
        margin-bottom: 6px
    }
    .currUser {
        .user {
            padding: 2px 6px;
            border: 1px solid #ccc
        }
    }
}
</style>
