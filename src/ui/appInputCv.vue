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
	<div>
		<input v-bind="$attrs" :style="style" type="text" v-model="model" />
		<slot />
	</div>
</template>

<style scoped>
div {
	anchor-name: v-bind(test);

	> input {
		font-family: inherit !important;
		width: 100% !important;
		padding: 0px;
		margin: 0px;
		border: none;
		height: calc(var(--font_size) * 1.25);
	}

	> :deep(button) {
		display: none;
	}

	& > input:hover + :deep(button),
	:deep(button):hover {
		display: grid;

		position: absolute;
		position-anchor: v-bind(test);
		bottom: anchor(top);
		right: anchor(right);
		margin-bottom: -5px;

		> :deep(svg) {
			margin: 0;
		}
	}
}
</style>
