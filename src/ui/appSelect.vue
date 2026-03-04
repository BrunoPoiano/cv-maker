<script setup lang="ts">
import { generateKey } from '@/helpers/generateKey'
import type { SelectItem } from '@/types'

defineOptions({
	inheritAttrs: false
})
type Props = {
	items: SelectItem
	id?: string
	label?: string
}
const props = defineProps<Props>()
const key = generateKey(5)
const model = defineModel()
</script>

<template>
	<div class="content">
		<label :for="id ?? key" v-if="props.label">{{ props.label }}</label>
		<select v-bind="$attrs" v-model="model">
			<option v-for="item in items" :value="item.value" :key="item.value">
				{{ item.label }}
			</option>
		</select>
	</div>
</template>

<style scoped>
.content {
	display: grid;
	gap: 0.5rem;

	label {
		text-transform: capitalize;
	}

	select {
		--bg: light-dark(#fff, #333b3c);

		cursor: pointer;
		font-size: var(--font-size-base);
		font-weight: 500;
		border: 1px solid var(--input-border);
		border-radius: 10px;
		padding: 0.3rem 0.6rem;
		background: var(--input-background);
		max-width: 20ch;

		transition:
			background 500ms,
			transform 200ms ease-out;

		&:hover:not(:disabled) {
			background: hsl(from var(--hover-bg, var(--bg)) h s calc(l - 10));
		}

		&:disabled {
			opacity: 60%;
			cursor: initial;
		}

		&:active:not(:disabled) {
			transform: scale(0.98);
		}
	}
}
</style>
