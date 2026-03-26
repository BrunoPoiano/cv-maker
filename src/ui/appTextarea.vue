<script setup lang="ts">
import { generateKey } from '@/helpers/generateKey'

type Props = {
	label?: string
	minHeight?: string
	id?: string
	rows?: string | number
	cvTextArea?: true
}

const props = defineProps<Props>()
const key = generateKey(5)
const model = defineModel<string>()

defineOptions({
	inheritAttrs: false
})

function defineHeight() {
	if (props.rows) {
		return `auto`
	}
	return props.minHeight ? props.minHeight : '241px'
}
</script>

<template>
	<textarea
		v-if="cvTextArea"
		data-cvTextArea
		v-bind="$attrs"
		:rows="rows"
		:id="id ?? key"
		v-model="model"
	/>
	<div class="content" v-else>
		<label :for="id ?? key" v-if="props.label">{{ props.label }}</label>
		<textarea
			:style="{ minHeight: `${defineHeight()}` }"
			v-bind="$attrs"
			:id="id ?? key"
			v-model="model"
		/>
	</div>
</template>

<style scoped>
textarea[data-cvTextArea] {
	font-family: inherit !important;
	width: 100% !important;
	padding: 0px !important;
	margin: 0px !important;
	border: none;
	color: inherit;
	border-radius: var(--cv-border-radius) !important;
	background: var(--background) !important;
}

.content {
	display: grid;
	gap: 0.5rem;

	label {
		text-transform: capitalize;
	}

	textarea {
		border: 1px solid var(--input-border);
		border-radius: var(--border-radius);
		corner-shape: squircle;
		padding: 0.8rem;
		min-height: 241px;
		background: var(--input-background);
		font-size: var(--font-size-base);
	}
}
</style>
