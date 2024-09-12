<script lang="ts" setup>
import { h, ref, reactive, onMounted } from 'vue'
import { NTime, NButton, useDialog, useMessage, NImage } from 'naive-ui'
import type { DataTableColumns, FormRules, FormInst, UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import articleSortApi from '@/api/apis/articleSortApi'
import { sysFileUpload } from '@/utils/ossUtil'
import DataTable from '@/components/DataTable.vue'
import SearchCard from '@/components/SearchCard.vue'

const dialog = useDialog()
const message = useMessage()

type queryFormType = {
    page: number,
    name: string
}

type addEditFormType = {
    name: string,
    img: string,
    remark: string
}

const queryForm = ref<queryFormType>({
    page: 1,
    name: ''
})
const queryFormInit = ref<queryFormType>({
    page: 1,
    name: ''
})
const total = ref<number>(0)

const addEditForm = ref<addEditFormType>({
    name: '',
    img: '',
    remark: ''
})
const addEditFormInit = ref<addEditFormType>({
    name: '',
    img: '',
    remark: ''
})

const addEditRules = reactive<FormRules>({
    name: [
        {required: true, trigger: 'blur', message: '请输入类名'},
        {max: 20, trigger: ['input', 'blur'], message: '类名最大长度20个字符'}
    ],
    img: {required: true, trigger: 'blur', message: '请上传分类图片'}
})

const dataList = ref<articleSortRequestType[]>([])
const showAddEditModal = ref<boolean>(false)
const addEditModalType = ref<string>('')
const addEditModalTitle = ref<string | null>(null)
const sortListLoading = ref<boolean>(false)
const imgFiles = ref<UploadFileInfo[]>([])
const uploadLoading = ref<boolean>(false)

const getList = async () => {
    sortListLoading.value = true
    const { data } = await articleSortApi.list(queryForm.value)
    sortListLoading.value = false
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
    addEditModalType.value = 'add'
    addEditModalTitle.value = '添加分类'
    showAddEditModal.value = true
}
// 编辑
const onEditHandle = async (id: string) => {
    const { data } = await articleSortApi.detail({id})
    addEditForm.value = data
    imgFiles.value = data.img ? [{id: 'imgId', name: new URL(data.img).pathname.split('/')[2], status: 'finished', url: data.img}] : []
    addEditModalType.value = 'edit'
    addEditModalTitle.value = '编辑分类'
    showAddEditModal.value = true
}

// 删除
const onDeleteHandle = (id: string) => {
    dialog.warning({
        title: '删除警告',
        content: '确定删除？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
            const { success } = await articleSortApi.delete({id})
            if (success) {
                getList()
            }
        }
    })
}

const columns = reactive<DataTableColumns<articleSortRequestType>>([
    {title: '类名', key: 'name', fixed: 'left', width: 140, ellipsis: {tooltip: true}},
    {
        title: '图片', key: 'img', align: 'center', width: 60,
        render: (row) => row.img ? h(NImage, {width: 30, height: 30, lazy: true, src: row.img, style: {borderRadius: '8px'}}) : '--'
    },
    {
        title: '创建时间', key: 'createTime', width: 180,
        render: (row) => h(NTime, {time: new Date(row.createTime)})
    },
    {title: '备注', key: 'remark', minWidth: 180},
    {
        title: '操作', key: 'operation', fixed: 'right', width: 120,
        render: (row) => [
            h(NButton, {text: true, type: 'info', style: {marginRight: '10px'}, onClick: () => onEditHandle(row.id)}, () => '修改'),
            h(NButton, {text: true, type: 'error', onClick: () => onDeleteHandle(row.id)}, () => '删除')
        ]
    }
])

const addEditFormRef = ref<FormInst | null>()
// 弹窗关闭
const onCloseModalHandle = () => {
    showAddEditModal.value = false
    uploadLoading.value = false
    imgFiles.value = []
    addEditForm.value = { ...addEditFormInit.value }
}
// 弹窗提交
const onSubmitModalHandle = () => {
    addEditFormRef.value?.validate(async err => {
        if (!err) {
            if (addEditModalType.value === 'add') {
                const { success } = await articleSortApi.add(addEditForm.value)
                if (success) {
                    onCloseModalHandle()
                    await getList()
                }
            } else if (addEditModalType.value === 'edit') {
                const { success } = await articleSortApi.edit(addEditForm.value)
                if (success) {
                    onCloseModalHandle()
                    await getList()
                }
            }
        }
    })
}

// 文件上传
const fileUpload = async (option: UploadCustomRequestOptions) => {
    const oss = await sysFileUpload(option.file)
    addEditForm.value.img = oss.url
    uploadLoading.value = false
}
const beforeFileUpload = (date: {file: UploadFileInfo, fileList: UploadFileInfo[]}) => {
    const re = new RegExp('^image/(png|jpeg)$', 'g')
    if (date.file.type && re.test(date.file.type)) {
        uploadLoading.value = true
        return true
    }
    message.warning('图片文件格式仅支持png/jpg/jpeg')
    return false
}
const removeFile = () => {
    imgFiles.value = []
    addEditForm.value.img = ''
}

onMounted(() => {
    getList()
})
</script>

<template>
    <div class="content-layout">
        <DataTable
            :columns="columns"
            :data="dataList"
            :loading="sortListLoading"
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
                    <n-form ref="formRef" inline :model="queryForm" label-width="auto" label-placement="left"
                        :show-feedback="false">
                        <n-form-item label="类名">
                            <n-input v-model:value="queryForm.name" placeholder="类名" clearable />
                        </n-form-item>
                    </n-form>
                </SearchCard>
            </template>
            <template #buttonSlot>
                <n-button type="info" @click="onAddHandle">添加</n-button>
            </template>
        </DataTable>
    </div>
    <n-modal preset="card" v-model:show="showAddEditModal" :title="addEditModalTitle"
        :mask-closable="false" style="width: 600px;">
        <n-form ref="addEditFormRef" :model="addEditForm" :rules="addEditRules">
            <n-form-item label="类名" path="name">
                <n-input v-model:value="addEditForm.name" placeholder="输入类名" />
            </n-form-item>
            <n-form-item label="图片" path="img">
                <n-upload
                    :custom-request="fileUpload"
                    v-model:file-list="imgFiles"
                    list-type="image-card"
                    accept=".jpg, .jpeg, .png"
                    :max="1"
                    @before-upload="beforeFileUpload"
                    @remove="removeFile"
                >
                </n-upload>
            </n-form-item>
            <n-form-item label="备注" path="remark">
                <n-input v-model:value="addEditForm.remark" type="textarea" maxlength="255" show-count
                    placeholder="备注" />
            </n-form-item>
        </n-form>
        <template #footer>
            <div class="modal-footer">
                <n-button type="info" @click="onSubmitModalHandle" :disabled="uploadLoading">提交</n-button>
                <n-button @click="onCloseModalHandle">取消</n-button>
            </div>
        </template>
    </n-modal>
</template>

<style lang="scss" scoped></style>
