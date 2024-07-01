<script lang="ts" setup>
import { reactive, ref, onMounted, h } from "vue"
import { NTime, NButton } from "naive-ui"
import type { DataTableColumns, FormRules, FormInst, TransferOption } from "naive-ui"
import userGroupApi from "@/api/apis/userGroupApi"
import authApi from "@/api/apis/authApi"
import userApi from "@/api/apis/userApi"

type TableDataType = {
    id: string,
    groupName: string,
    createTime: string
    remark: string
}

type addEditFormType = {
    groupName: string,
    remark: string
}

const queryForm = ref({
    page: 1,
    userGroupName: ""
})
const queryFormInit = ref({
    page: 1,
    userGroupName: ""
})
const addEditForm = ref<addEditFormType>({
    groupName: "",
    remark: ""
})
const addEditFormInit = ref<addEditFormType>({
    groupName: "",
    remark: ""
})

const dataList = ref<TableDataType[]>([])
const total = ref<number>(0)
// 用户组列表
const getList = async () => {
    const { data } = await userGroupApi.getUserGroupList(queryForm.value)
    dataList.value = data.list
    total.value = data.total
}

// 删除
const onDeleteHandle = async (id: string) => {
    const { success } = await userGroupApi.deleteUserGroup({id})
    if (success) {
        getList()
    }
}
const showAddEditModal = ref<boolean>(false)
const showUserAndAuthDrawer = ref<boolean>(false)
const addEditModalType = ref<string | null>(null)
const userAndAuthDrawerType = ref<string | null>(null)

const userValue = ref<Array<string | number>>([])
const userOptions = ref<TransferOption[]>([])
const authValue = ref<Array<string | number>>([])
const authOptions = ref<TransferOption[]>([])
const currDrawerUserGroup = ref<TableDataType | null>(null)

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
// 全部用户
const getAllUser = async () => {
    const { data } = await userApi.getAllUserList()
    userOptions.value = []
    data.forEach((item: userRequestType) => {
        userOptions.value.push({
            label: item.username,
            value: item.id,
            disabled: false
        })
    })
}
// 用户组
const getUserGroupAuth = async (id: string) => {
    const { data } = await userGroupApi.getUserGroupAuthList({id})
    authValue.value = []
    data.forEach((item: authRequestType) => {
        authValue.value.push(item.id)
    })
}
// 用户
const getUser = async (id: string) => {
    const { data } = await userApi.getUserInUserGroup({id})
    userValue.value = []
    data.forEach((item: userRequestType) => {
        userValue.value.push(item.id)
    })
}

// 添加
const onAddHandle = () => {
    addEditModalType.value = "add"
    showAddEditModal.value = true
}
// 编辑
const onEditHandle = async (id: string) => {
    const { data } = await userGroupApi.getUserGroupDetail({id})
    addEditForm.value = data
    addEditModalType.value = "edit"
    showAddEditModal.value = true
}
// 向用户组添加用户
const onAddUserHandle = (user: TableDataType) => {
    getAllUser()
    getUser(user.id)
    currDrawerUserGroup.value = user
    userAndAuthDrawerType.value = "user"
    showUserAndAuthDrawer.value = true
}
// 授权
const onAuthHandle = (user: TableDataType) => {
    getAuthList()
    getUserGroupAuth(user.id)
    currDrawerUserGroup.value = user
    userAndAuthDrawerType.value = "auth"
    showUserAndAuthDrawer.value = true
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
    groupName: [
        {required: true, trigger: "blur", message: "请输入用户组名"},
        {max: 20, trigger: ["input", "blur"], message: "用户组名最大长度20个字符"}
    ]
})

const topBoxRef = ref()
const topBoxRefHeight = ref<string>("0px")
onMounted(() => {
    topBoxRefHeight.value = topBoxRef.value.clientHeight + "px"
    getList()
})

const addEditFormRef = ref<FormInst | null>()
// 弹窗关闭
const onCloseModalHandle = () => {
    showAddEditModal.value = false
    addEditForm.value = {...addEditFormInit.value}
}
// 弹窗提交
const onSubmitModalHandle = () => {
    addEditFormRef.value?.validate(async err => {
        if (!err) {
            if (addEditModalType.value === "add") {
                const { success } = await userGroupApi.addUserGroup(addEditForm.value)
                if (success) {
                    onCloseModalHandle()
                    getList()
                }
            } else if (addEditModalType.value === "edit") {
                const { success } = await userGroupApi.editUserGroup(addEditForm.value)
                if (success) {
                    onCloseModalHandle()
                    getList()
                }
            }
        }
    })
}
// 抽屉关闭
const onCloseDrawerHandle = () => {
    showUserAndAuthDrawer.value = false
}
// 抽屉提交
const onSubmitDrawerHandle = async () => {
    if (userAndAuthDrawerType.value === "user") {
        const { success } = await userGroupApi.updateUserList({
            id: currDrawerUserGroup.value?.id,
            userId: userValue.value
        })
        if (success) {
            onCloseDrawerHandle()
        }
    } else {
        const { success } = await userGroupApi.updateUserGroupAuthList({
            id: currDrawerUserGroup.value?.id,
            authList: authValue.value
        })
        if (success) {
            onCloseDrawerHandle()
        }
    }
    onCloseDrawerHandle()
}

const columns = reactive<DataTableColumns<TableDataType>>([
    { title: "用户组名", key: "groupName", fixed: "left", minWidth: 100},
    {
        title: "创建时间", key: "createTime", minWidth: 180,
        render: (row) => h(NTime, {time: new Date(row.createTime)})
    },
    { title: "备注", key: "remark", minWidth: 180},
    {
        title: "操作", key: "operation", fixed: "right", minWidth: 200,
        render: (row) => [
            h(NButton, {text: true, type: "info", style: {marginRight: "10px"}, onClick: () => onEditHandle(row.id)}, () => "修改"),
            h(NButton, {text: true, type: "info", style: {marginRight: "10px"}, onClick: () => onAddUserHandle(row)}, () => "添加用户"),
            h(NButton, {text: true, type: "info", style: {marginRight: "10px"}, onClick: () => onAuthHandle(row)}, () => "授权"),
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
                        <n-input v-model:value="queryForm.userGroupName" placeholder="请输入用户组名" clearable />
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
        :title="addEditModalType === 'add' ? '添加用户组' : '编辑用户'"
        :mask-closable="false"
        style="width: 600px;"
    >
        <n-form
            ref="addEditFormRef"
            :model="addEditForm"
            :rules="addEditRules"
        >
            <n-form-item label="用户组名" path="groupName">
                <n-input v-model:value="addEditForm.groupName" placeholder="输入用户名" />
            </n-form-item>
            <n-form-item label="备注" path="remark">
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
        v-model:show="showUserAndAuthDrawer"
        :width="600"
        :close-on-esc="false"
        :mask-closable="false"
    >
        <n-drawer-content :title="userAndAuthDrawerType === 'user' ? '添加用户' : '用户授权'">
            <div class="drawer-content currUserGroup">
                <div class="sub-title">
                    用户组
                </div>
                <div class="userGroup">
                    <span>{{ currDrawerUserGroup?.groupName }}</span>
                </div>
            </div>
            <div class="drawer-content auth">
                <div class="sub-title">
                    权限
                </div>
                <n-transfer
                    v-if="userAndAuthDrawerType === 'user'"
                    ref="userGroupTransfer"
                    v-model:value="userValue"
                    :options="userOptions"
                    source-title="全部用户"
                    target-title="已添加用户"
                    select-all-text="全选"
                    clear-text="清除"
                    source-filter-placeholder="搜索用户"
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
.content-layout {
    display: flex;
    flex-direction: column;
    gap: $layout-gap
}
.n-drawer {
    .drawer-content {
        margin-bottom: 20px
    }
    .sub-title {
        font-weight: 500;
        margin-bottom: 6px
    }
    .currUserGroup {
        .userGroup {
            padding: 2px 6px;
            border: 1px solid #ccc
        }
    }
}
</style>
