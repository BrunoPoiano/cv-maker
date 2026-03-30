<script setup lang="ts">
import { ref, watch } from 'vue'

import Textarea from '@/ui/appTextarea.vue'
type Props = {
	list: boolean
	rows?: number
}

const model = defineModel<string | string[]>({
	required: true
})

const { list, rows } = defineProps<Props>()

defineOptions({
	inheritAttrs: false
})

const desc = ref('')

watch(
	() => model.value,
	(value) => {
		desc.value = Array.isArray(value) ? value.join('\n') : (value ?? '')
	},
	{ immediate: true }
)

watch(desc, (value) => {
	model.value = list ? value.split('\n').filter(Boolean) : value
})

watch(
	() => list,
	(newValue) => {
		updateData(newValue)
	}
)

function updateData(list: boolean) {
	model.value = list
		? desc.value.split('\n').filter((item) => item !== '')
		: desc.value
}
</script>

<template>
	<Textarea
		v-bind="$attrs"
		:rows="rows"
		v-model="desc"
		@keyup="updateData(list)"
	/>
</template>
