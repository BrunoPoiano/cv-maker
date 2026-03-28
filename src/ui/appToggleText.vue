<script setup lang="ts">
import type { CSSProperties } from 'vue'

import { generateKey } from '@/helpers/generateKey'
type Props = {
	labelStart?: string | Element
	labelEnd?: string | Element
	style?: CSSProperties
	afterChange?: () => void
	colorCheck?: true
}
const modelValue = defineModel<boolean>()
const { labelStart, style, labelEnd, afterChange } = defineProps<Props>()
const key = generateKey(5)

defineOptions({
	inheritAttrs: false
})

function changeCheckBox() {
	modelValue.value = !modelValue.value
	if (afterChange) {
		afterChange()
	}
}
</script>

<template>
	<div class="toggle-text" :style="style">
		<label :for="key" class="switch">
			<input
				:id="key"
				type="checkbox"
				:checked="modelValue"
				v-bind="$attrs"
				@change="changeCheckBox"
			/>
			<span v-if="labelStart" :data-check="modelValue">{{ labelStart }}</span>
			<span v-if="labelEnd" :data-check="!modelValue">{{ labelEnd }}</span>
		</label>
	</div>
</template>

<style scoped>
.toggle-text {
	--_padding: 0.4rem;

	align-items: Center;
	width: fit-content;
	background: var(--surface-container-highest);
	border-radius: var(--border-radius);
	padding: var(--_padding);

	span[data-check='true'] {
		background: var(--background);
	}

	label {
		display: flex;
	}

	input {
		opacity: 0;
		width: 0;
		height: 0;
		margin: 0;
	}

	span {
		font-size: var(--font-size-sm);
		cursor: pointer;
		padding: 0.2rem 0.4rem;
		text-transform: uppercase;
		border-radius: calc(var(--border-radius) - var(--_padding));
	}
}
</style>
