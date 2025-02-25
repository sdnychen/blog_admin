<script lang="ts" setup>
import {h, ref, reactive, onMounted, useTemplateRef, onActivated} from 'vue'
import { NTime, NButton, useDialog, useMessage } from 'naive-ui'
import type { DataTableColumns, FormRules, FormInst } from 'naive-ui'
import articleTagApi from '@/api/apis/articleTagApi'
import SearchCard from '@/components/SearchCard.vue'
import DataTable from '@/components/DataTable.vue'

const dialog = useDialog()
const message = useMessage()

const queryForm = ref<articleTagSortQueryParam>({
    page: 1,
    name: ''
})
const queryFormInit = ref<articleTagSortQueryParam>({
    page: 1,
    name: ''
})
const total = ref<number>(0)

const addEditForm = ref<articleTagDataType>({
    name: '',
    color: '',
    remark: ''
})
const addEditFormInit = ref<articleTagDataType>({
    name: '',
    color: '',
    remark: ''
})

const addEditRules = reactive<FormRules>({
    name: [
        {required: true, trigger: 'blur', message: '请输入标签名'},
        {max: 20, trigger: ['input', 'blur'], message: '标签名最大长度20个字符'}
    ],
    color: [
        {required: true, trigger: 'blur', message: '请选择标签颜色'}
    ]
})

const dataList = ref<articleTagDataType[]>([])

const showAddEditModal = ref<boolean>(false)
const addEditModalType = ref<string>('')
const addEditModalTitle = ref<string | null>(null)
const tagListLoading = ref<boolean>(false)

const getList = async () => {
    tagListLoading.value = true
    const { data, success } = await articleTagApi.list(queryForm.value)
    tagListLoading.value = false
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

// 添加
const onAddHandle = () => {
    addEditModalType.value = 'add'
    addEditModalTitle.value = '添加标签'
    showAddEditModal.value = true
}
// 编辑
const onEditHandle = async (id: string) => {
    const { data } = await articleTagApi.detail({id})
    addEditForm.value = data
    addEditModalType.value = 'edit'
    addEditModalTitle.value = '编辑标签'
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
            const { success } = await articleTagApi.delete({id})
            success && await getList()
        }
    })
}

// 复制颜色
const colorCopy = async (color: string) => {
    await navigator.clipboard.writeText(color).catch(() => message.error('复制失败'))
    message.success('复制成功')
}

const columns = reactive<DataTableColumns<articleTagDataType>>([
    {title: '标签名', key: 'name', fixed: 'left', width: 140, ellipsis: {tooltip: true}},
    {
        title: '颜色', key: 'color', align: 'center', width: 100,
        render: (row) => h('div', {class: 'color-preview-box', style: {backgroundColor: row.color}, onClick: () => colorCopy(row.color)})
    },
    {
        title: '创建时间', key: 'createTime', width: 180,
        render: (row) => h(NTime, {time: new Date(row.createTime as string)})
    },
    {title: '备注', key: 'remark', minWidth: 180},
    {
        title: '操作', key: 'operation', fixed: 'right', width: 120,
        render: (row) => [
            h(NButton, {text: true, type: 'info', style: {marginRight: '10px'}, onClick: () => onEditHandle(row.id as string)}, () => '修改'),
            h(NButton, {text: true, type: 'error', onClick: () => onDeleteHandle(row.id as string)}, () => '删除')
        ]
    }
])

const addEditFormRef = useTemplateRef<FormInst>('addEditFormRef')
// 弹窗关闭
const onCloseModalHandle = () => {
    showAddEditModal.value = false
    addEditForm.value = { ...addEditFormInit.value }
}
// 弹窗提交
const onSubmitModalHandle = () => {
    addEditFormRef.value?.validate(async err => {
        if (!err) {
            if (addEditModalType.value === 'add') {
                const { success } = await articleTagApi.add(addEditForm.value)
                if (success) {
                    onCloseModalHandle()
                    await getList()
                }
            } else if (addEditModalType.value === 'edit') {
                const { success } = await articleTagApi.edit(addEditForm.value)
                if (success) {
                    onCloseModalHandle()
                    await getList()
                }
            }
        }
    })
}

onMounted(() => {
    console.log('onMounted')
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
            <template #searchSlot>
                <SearchCard @search-handle="searchHandle" @reset-handle="resetHandle">
                    <n-form inline :model="queryForm" label-width="auto" label-placement="left" :show-feedback="false">
                        <n-form-item label="标签名">
                            <n-input v-model:value="queryForm.name" placeholder="标签名" clearable />
                        </n-form-item>
                    </n-form>
                </SearchCard>
            </template>
            <template #buttonSlot>
                <n-button type="info" @click="onAddHandle">添加</n-button>
            </template>
        </DataTable>
    </div>
    <n-modal
        v-model:show="showAddEditModal" preset="card" :title="addEditModalTitle"
        :mask-closable="false" style="width: 600px;"
    >
        <n-form ref="addEditFormRef" :model="addEditForm" :rules="addEditRules">
            <n-form-item label="标签名" path="name">
                <n-input v-model:value="addEditForm.name" placeholder="输入标签名" />
            </n-form-item>
            <n-form-item label="颜色" path="color">
                <n-color-picker v-model:value="addEditForm.color" :modes="['hex']" :show-alpha="true" show-preview />
            </n-form-item>
            <n-form-item label="备注" path="remark">
                <n-input
                    v-model:value="addEditForm.remark" type="textarea" maxlength="255" show-count
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
</template>

<style lang="scss" scoped>
:deep(.color-preview-box) {
    width: 40px;
    height: 22px;
    border-radius: 4px;
    cursor: pointer;
}
</style>
