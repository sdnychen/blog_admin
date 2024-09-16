<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { PaperPlane } from '@vicons/ionicons5'
import IconRender from '@/utils/IconRender'
import EditorArticle from './Editor/EditorArticle.vue'
import articleTagApi from '@/api/apis/articleTagApi'
import articleSortApi from '@/api/apis/articleSortApi'
import articleApi from '@/api/apis/articleApi'
import { useMessage } from 'naive-ui'
import type { FormInst, FormRules, UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import { articleFileUpload } from '@/utils/ossUtil'
import { ArticleStatusEnum } from '@/enum/ArticleStatusEnum'

const message = useMessage()
const emit = defineEmits(['onCloseArticleEditHandle'])
const props = defineProps({
    type: {
        type: String,
        required: true
    },
    id: String
})

type ArticleForm = {
    id: string | null,
    title: string,
    alias: string,
    content: string,
    intro: string,
    img: string,
    tagList: Array<string> | null,
    sort: string | null,
    remark: string,
    status: number
}

const form = ref<ArticleForm>({
    id: null,
    title: '',
    alias: '',
    content: '',
    intro: '',
    img: '',
    tagList: null,
    sort: null,
    remark: '',
    status: 1
})
const tagList = ref<articleTagRequestType[]>()
const sortList = ref<articleSortRequestType[]>()
const uploadLoading = ref<boolean>(false)
const imgFiles = ref<UploadFileInfo[]>([])

// 获取文章详情
const getArticle = async () => {
    const { success, data } = await articleApi.detail({id: props.id})
    if (success) {
        form.value = data
        imgFiles.value = data.img ? [{id: 'imgId', name: new URL(data.img).pathname.split('/')[2], status: 'finished', url: data.img}] : []
    }
}
// 获取标签下拉
const getTagAllList = async (name: string = '') => {
    const { data } = await articleTagApi.allList({name})
    tagList.value = data
}
// 获取分类下拉
const getSortAllList = async (name: string = '') => {
    const { data } = await articleSortApi.allList({name})
    sortList.value = data
}
// 文件上传
const fileUpload = async (option: UploadCustomRequestOptions) => {
    const oss = await articleFileUpload(option.file)
    form.value.img = oss.url
    uploadLoading.value = false
}
const beforeFileUpload = (date: {file: UploadFileInfo, fileList: UploadFileInfo[]}) => {
    const re = new RegExp('^image/(png|jpeg)$', 'g')
    if (date.file.type && re.test(date.file.type)) {
        uploadLoading.value = true
        return true
    }
    message.warning('头像文件格式仅支持png/jpg/jpeg')
    return false
}
const removeFile = () => {
    imgFiles.value = []
    form.value.img = ''
}

const onCloseHandle = () => {
    emit('onCloseArticleEditHandle')
}

const formRef = ref<FormInst | null>()
const onSavePublishHandle = (type: string) => {
    formRef.value?.validate(async err => {
        if (!err) {
            if (type === 'publish') {
                form.value.status = ArticleStatusEnum['已发布']
            }
            if (!!form.value.id) {
                await articleApi.edit(form.value)
            } else {
                const { data } = await articleApi.add(form.value)
                form.value.id = data.id
            }
            type === 'publish' && onCloseHandle()
        }
    })
}

onMounted(() => {
    if (props.type === 'edit') {
        getArticle()
    }
    getTagAllList()
    getSortAllList()
})

const formRules = reactive<FormRules>({
    title: [
        {required: true, trigger: 'input', message: '请输入文章标题'},
        {max: 50, trigger: ['input', 'blur'], message: '文章标题最大长度50个字符'}
    ],
    alias: {required: true, trigger: 'input', message: '请输入文章别名'},
    intro: {required: true, trigger: 'input', message: '请输入文章简介'},
    img: {required: true, trigger: 'blur', message: '请上传文章首图'},
    sort: {required: true, trigger: ['blur', 'change'], message: '请选择文章分类'},
    tagList: {type: 'array', required: false, trigger: ['blur', 'change'], message: '请选择文章标签'}
})
</script>

<template>
    <div class="article-edit-box">
        <div class="article-edit-box-top">
            <n-button type="error" quaternary @click="onCloseHandle">关闭</n-button>
            <n-button :disabled="uploadLoading" @click="onSavePublishHandle('save')">保存</n-button>
            <n-button :disabled="uploadLoading" @click="onSavePublishHandle('publish')" type="info" :render-icon="IconRender(PaperPlane)">发布</n-button>
        </div>
        <n-divider />
        <div class="article-edit-box-content">
            <div class="article-edit-box-main">
                <EditorArticle v-model="form.content" />
            </div>
            <div class="article-edit-box-right">
                <n-form ref="formRef" :model="form" :rules="formRules" label-width="auto" label-placement="top">
                    <n-form-item label="标题" path="title">
                        <n-input v-model:value="form.title" placeholder="请输入文章标题" clearable />
                    </n-form-item>
                    <n-form-item label="别名" path="alias">
                        <n-input v-model:value="form.alias" placeholder="请输入文章别名" clearable />
                    </n-form-item>
                    <n-alert type="info" style="margin-bottom: 10px;">
                        别名将用于生成文章地址
                    </n-alert>
                    <n-form-item label="简介" path="intro">
                        <n-input v-model:value="form.intro" type="textarea" placeholder="请输入文章简介" maxlength="100" show-count clearable />
                    </n-form-item>
                    <n-form-item label="首图" path="img">
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
                    <n-form-item label="分类" path="sort">
                        <n-select v-model:value="form.sort" label-field="name" value-field="id" placeholder="请选择分类" :options="sortList" />
                    </n-form-item>
                    <n-form-item label="标签" path="tagList">
                        <n-select v-model:value="form.tagList" label-field="name" value-field="id" placeholder="请选择标签" multiple :options="tagList" />
                    </n-form-item>
                    <n-form-item label="备注" path="remark">
                        <n-input v-model:value="form.remark" type="textarea" placeholder="请输入文章备注" maxlength="255" show-count clearable />
                    </n-form-item>
                </n-form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$padding: 12px;

.article-edit-box {
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    border-radius: $box-radius;
    padding: $padding;
    background-color: getColor(main-bg-color);
}
.article-edit-box-top {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 10px;
    .n-button {
        font-size: 1.6rem;
    }
}
.n-divider {
    margin-top: $padding !important;
    margin-bottom: $padding !important;
}
.article-edit-box-content {
    display: flex;
    height: calc(100% - 34px - 2 * $padding - 1px);
    .article-edit-box-main {
        flex: 1;
    }
    .article-edit-box-right {
        width: 260px;
        margin-left: $padding;
        padding-left: $padding;
        border-left: 1px solid #dadada;
        overflow-y: auto;
    }
}
:deep(.n-upload-file-list) {
    display: block;
    .n-upload-file {
        width: 100%;
      height: 140px;
    }
}
</style>
