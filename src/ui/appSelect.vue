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
		<select v-bind="$attrs" :id="id ?? key" v-model="model">
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
		--bg: light-dark(#fff, #000);

		cursor: pointer;
		font-size: var(--font-size-base);
		font-weight: 500;
		border: 1px solid var(--input-border);
		border-radius: var(--border-radius);
		corner-shape: squircle;
		padding: 0.4rem 0.8rem;
		background: var(--bg);
		max-width: 20ch;

		transition:
			background 500ms,
			transform 200ms ease-out;

		&:hover:not(:disabled) {
			--hover-bg-adjusted: light-dark(
				hsl(from var(--bg) h s calc(l - 10)),
				hsl(from var(--bg) h s calc(l + 15))
			);

			background: var(--hover-bg-adjusted);
		}

		&:disabled {
			opacity: 60%;
			cursor: initial;
		}

		&:active:not(:disabled) {
			transform: scale(0.98);
		}

		&:focus-visible {
			outline-color: var(--input-border) !important;
		}
	}
}
</style>
