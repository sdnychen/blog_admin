<script lang="ts" setup>
import Editor from '@tinymce/tinymce-vue'
import { reactive, defineModel } from 'vue'

const content = defineModel()
const init = reactive({
    language: 'zh_CN',
    plugins: 'lists link image table code codesample help wordcount',
    toolbar: 'undo redo |link image accordion | styles | bold italic underline strikethrough | align | bullist numlist',
    resize: false,
    branding: false
})
</script>

<template>
    <div class="editor-content-box">
        <Editor
            v-model="content"
            api-key="1ryxfkeokqlkjk31aplsfq5555iwujzaoi4bgntr7gku4p8k"
            :init="init"
        />
    </div>
</template>

<style lang="scss" scoped>
.editor-content-box {
    height: 100%;
}
.tox-tinymce {
    height: 100% !important;
}
</style>
