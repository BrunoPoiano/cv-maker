<script setup lang="ts">
import { generateKey } from '@/helpers/generateKey'

type Props = {
	label?: string
	minHeight?: string
	id?: string
}

const props = defineProps<Props>()
const key = generateKey(5)
const model = defineModel<string>()

defineOptions({
	inheritAttrs: false
})
</script>

<template>
	<div class="content">
		<label :for="id ?? key" v-if="props.label">{{ props.label }}</label>
		<textarea
			:style="props.minHeight ? `min-height:${props.minHeight}` : ''"
			v-bind="$attrs"
			:id="id ?? key"
			v-model="model"
		/>
	</div>
</template>

<style scoped>
.content {
	display: grid;
	gap: 0.5rem;

	label {
		text-transform: capitalize;
	}

	textarea {
		border: 1px solid var(--input-border);
		border-radius: 10px;
		padding: 1rem 0.6rem;
		min-height: 241px;
		background: var(--input-background);
		font-size: var(--font-size-base);
	}
}
</style>
