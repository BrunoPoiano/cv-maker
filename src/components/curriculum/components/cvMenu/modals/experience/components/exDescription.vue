<script setup lang="ts">
import { ref, watch } from 'vue'

import Textarea from '@/ui/appTextarea.vue'
type Props = {
	list: boolean
	rows?: number
}

const model = defineModel<string | string[]>()
const { list, rows } = defineProps<Props>()

defineOptions({
	inheritAttrs: false
})

const desc = ref(
	Array.isArray(model.value) ? model.value.join('\n') : model.value
)

watch(
	() => list,
	(newValue) => {
		updateData(newValue)
	}
)

function updateData(list: boolean) {
	if (desc.value) {
		model.value = list
			? desc.value.split('\n').filter((item) => item !== '')
			: desc.value
	}
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
