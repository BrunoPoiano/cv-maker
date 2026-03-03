<script setup lang="ts">
import Input from '@/ui/appInput.vue'
import { ref } from 'vue'

const model = defineModel<Date | null>()

defineOptions({
	inheritAttrs: false
})

const date = ref(fixDate(model.value))

function fixDate(date?: Date | null) {
	if (date instanceof Date) {
		return (
			date.getFullYear() +
			'-' +
			String(date.getMonth() + 1).padStart(2, '0') +
			'-' +
			String(date.getDate()).padStart(2, '0')
		)
	}
	return null
}

function changeDate() {
	model.value = date.value ? new Date(date.value) : null
}
</script>

<template>
	<Input v-bind="$attrs" v-model="date" @change="changeDate" />
</template>
