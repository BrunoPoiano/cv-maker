<script setup lang="ts">
import type { CSSProperties } from 'vue'

import { generateKey } from '@/helpers/generateKey'
import type { SelectItem } from '@/types'

defineOptions({
	inheritAttrs: false
})
type Props = {
	items: SelectItem
	id?: string
	label?: string
	backgroundColor?: string
	small?: true
	fitContent?: true
	fullWidth?: true
}
const props = defineProps<Props>()
const key = generateKey(5)
const model = defineModel()

function selectWidth(): CSSProperties {
	if (props.fullWidth) {
		return {
			width: '100%',
			maxWidth: '100%'
		}
	}

	if (props.fitContent) {
		return {
			maxWidth: 'fit-content'
		}
	}

	if (props.small) {
		return {
			maxWidth: '10ch'
		}
	}

	return {}
}
</script>

<template>
	<div class="content">
		<label :for="id ?? key" v-if="props.label">{{ props.label }}</label>
		<select
			v-bind="$attrs"
			:id="id ?? key"
			v-model="model"
			:style="{ '--bg': props.backgroundColor, ...selectWidth() }"
		>
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
		--bg: var(--surface-bright);
		--_padding-block: 0.5rem;
		--_padding-inline: calc(var(--_padding-block) * 2);

		cursor: pointer;
		font-size: var(--font-size-base);
		font-weight: 500;
		border: 1px solid var(--outline-variant);
		border-radius: var(--border-radius);
		corner-shape: squircle;
		background: var(--bg);
		max-width: 20ch;
		padding-inline: var(--_padding-inline);
		padding-block: var(--_padding-block);

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
			outline-color: var(--focus-outline) !important;
		}
	}
}
</style>
