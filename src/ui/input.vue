<script setup lang="ts">
import { generateKey } from '@/helpers/generateKey'
import type { InputTypeHTMLAttribute } from 'vue'

type Props = {
	label?: string
	type?: InputTypeHTMLAttribute
	id?: string
}

const model = defineModel()
const props = defineProps<Props>()
const key = generateKey(5)

defineOptions({
	inheritAttrs: false
})
</script>

<template>
	<div class="content">
		<label :for="id ?? key">{{ props.label }}</label>
		<input
			v-bind="$attrs"
			:id="id ?? key"
			:type="props.type ?? 'text'"
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

	input {
		border: 1px solid #80808070;
		border-radius: 10px;
		padding: 0.3rem 0.6rem;
	}
}
</style>
