<script setup lang="ts">
import { generateKey } from '@/helpers/generateKey'

type Props = {
	modelValue: string
	label?: string
	minHeight?: string
	id?: string
}

const props = defineProps<Props>()
const key = generateKey(5)

defineOptions({
	inheritAttrs: false
})

const emit = defineEmits<{
	(e: 'update:modelValue', value: string | number | null): void
}>()

function onInput(event: InputEvent) {
	const target = event.target as HTMLInputElement
	if (event.target) {
		emit('update:modelValue', target.value)
	}
}
</script>

<template>
	<div class="content">
		<label :for="id ?? key" v-if="props.label">{{ props.label }}</label>
		<textarea
			:style="props.minHeight ? `min-height:${props.minHeight}` : ''"
			v-bind="$attrs"
			:id="id ?? key"
			:value="props.modelValue"
			@input="onInput"
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
		border: 1px solid #80808070;
		border-radius: 10px;
		padding: 1rem 0.6rem;
		min-height: 241px;
		font-size: var(--font-size-base);
	}
}
</style>
