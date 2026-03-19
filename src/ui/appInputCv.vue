<script setup lang="ts">
import type { CSSProperties } from 'vue'

import { generateKey } from '@/helpers/generateKey'

const model = defineModel()

const test = `--${generateKey(5, 'string')}`

type Props = {
	style?: CSSProperties | string
}
const { style } = defineProps<Props>()
defineOptions({
	inheritAttrs: false
})
</script>

<template>
	<input v-bind="$attrs" :style="style" type="text" v-model="model" />
</template>

<style scoped>
input {
	font-family: inherit !important;
	width: 100% !important;
	padding: 0px !important;
	margin: 0px !important;
	border: none;
	height: calc(var(--font_size) * 1.25);
}
</style>
