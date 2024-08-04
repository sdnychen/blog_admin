<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue"
import { PaperPlane } from "@vicons/ionicons5"
import renderIcon from "@/utils/IconRender"
import EditorArticle from "./Editor/EditorArticle.vue"
import articleTagApi from "@/api/apis/articleTagApi"
import articleSortApi from "@/api/apis/articleSortApi"
import articleApi from "@/api/apis/articleApi"
import { type FormRules } from "naive-ui"

const emit = defineEmits(["onCloseArticleEditHandle"])
const props = defineProps({
    type: {
        type: String,
        required: true
    },
    id: String
})

type ArticleForm = {
    title: string,
    alias: string,
    content: string,
    intro: string,
    img: string,
    tagList: Array<string> | null,
    sortList: Array<string> | null,
    remark: string,
    status: number
}

const form = ref<ArticleForm>({
    title: "",
    alias: "",
    content: "",
    intro: "",
    img: "1", // todo 临时使用
    tagList: null,
    sortList: null,
    remark: "",
    status: 1
})
const tagList = ref<articleTagRequestType[]>()
const sortList = ref<articleSortRequestType[]>()

// 获取文章
const getArticle = async () => {
    const { success, data } = await articleApi.detail({id: props.id})
    if (success) {
        form.value = data
    }
}
// 获取标签下拉
const getTagAllList = async (name: string = "") => {
    const { data } = await articleTagApi.allList({name})
    tagList.value = data
}
// 获取分类下拉
const getSortAllList = async (name: string = "") => {
    const { data } = await articleSortApi.allList({name})
    sortList.value = data
}

const onCloseHandle = () => {
    emit("onCloseArticleEditHandle")
}

const onSavePublishHandle = async (type: string) => {
    if (type === "save") {
        await articleApi.add(form.value)
    }
}

onMounted(() => {
    if (props.type === "edit") {
        getArticle()
    }
    getTagAllList()
    getSortAllList()
})

const formRules = reactive<FormRules>({
    title: [
        {required: true, trigger: "input", message: "请输入文章标题"},
        {max: 50, trigger: ["input", "blur"], message: "文章标题最大长度50个字符"}
    ],
    alias: {required: true, trigger: "input", message: "请输入文章别名"},
    intro: {required: true, trigger: "input", message: "请输入文章简介"},
    sortList: {type: "array", required: true, trigger: ["blur", "change"], message: "请选择文章分类"},
    tagList: {type: "array", required: true, trigger: ["blur", "change"], message: "请选择文章标签"}
})
</script>

<template>
    <div class="article-edit-box">
        <div class="article-edit-box-top">
            <n-button type="error" quaternary @click="onCloseHandle">关闭</n-button>
            <n-button @click="onSavePublishHandle('save')">保存草稿</n-button>
            <n-button type="info" :render-icon="renderIcon(PaperPlane)">发布</n-button>
        </div>
        <n-divider />
        <div class="article-edit-box-content">
            <div class="article-edit-box-main">
                <EditorArticle v-model="form.content" />
            </div>
            <div class="article-edit-box-right">
                <n-form ref="formRef" :model="form" :rules="formRules" label-width="auto" label-placement="top">
                    <n-form-item label="文章标题" path="title">
                        <n-input v-model:value="form.title" placeholder="文章标题" clearable />
                    </n-form-item>
                    <n-form-item label="文章别名" path="alias">
                        <n-input v-model:value="form.alias" placeholder="文章标题" clearable />
                    </n-form-item>
                    <n-form-item label="文章简介" path="intro">
                        <n-input v-model:value="form.intro" type="textarea" placeholder="文章简介" maxlength="100" show-count clearable />
                    </n-form-item>
                    <n-form-item label="文章分类" path="sortList">
                        <n-select v-model:value="form.sortList" label-field="name" value-field="id" multiple :options="sortList" />
                    </n-form-item>
                    <n-form-item label="文章标签" path="tagList">
                        <n-select v-model:value="form.tagList" label-field="name" value-field="id" multiple :options="tagList" />
                    </n-form-item>
                    <n-form-item label="文章备注" path="remark">
                        <n-input v-model:value="form.remark" type="textarea" placeholder="文章备注" maxlength="255" show-count clearable />
                    </n-form-item>
                </n-form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scope>
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
    }
}
</style>
