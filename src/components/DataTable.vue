<script lang="ts" setup>
import { ref, onMounted, useSlots } from 'vue'
import MainCard from '@/components/MainCard.vue'

const topBoxRef = ref()
const topBoxRefHeight = ref<string>('0px')

const topBarRef = ref()
const topBarHeight = ref<string>('0px')

onMounted(() => {
    topBoxRefHeight.value = topBoxRef.value.clientHeight + 'px'
    topBarHeight.value = useSlots().buttonSlot ? topBarRef.value.clientHeight + 'px' : '0px'
})
</script>

<template>
    <div ref="topBoxRef" class="top-box-ref">
        <slot name="searchSlot" />
    </div>
    <div>
        <MainCard>
            <div ref="topBarRef" :class="!!useSlots().buttonSlot ? 'data-table-top_bar' : ''">
                <slot name="buttonSlot" />
            </div>
            <div>
                <n-data-table
                    remote
                    flex-height
                    scroll-x=""
                    :top-box-height="topBoxRefHeight"
                    v-bind="$attrs"
                />
            </div>
        </MainCard>
    </div>
</template>

<style lang="scss" scoped>
.data-table-top_bar {
    padding-bottom: 10px;
}
.n-data-table {
    height: calc($content-height - v-bind(topBoxRefHeight) - 2 * $card-box-padding - $layout-gap - v-bind(topBarHeight));
}
</style>
