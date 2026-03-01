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
		<label :for="id ?? key">{{ props.label }}</label>
		<select v-bind="$attrs" v-model="model">
			<option v-for="item in items" :value="item.value">
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
		border: 1px solid #80808070;
		border-radius: 10px;
		padding: 0.3rem 0.6rem;
	}
}
</style>
