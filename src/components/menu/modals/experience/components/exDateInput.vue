<script setup lang="ts">
import { ref } from 'vue'

import Input from '@/ui/appInput.vue'

const model = defineModel<Date | string | null>()

defineOptions({
	inheritAttrs: false
})

const date = ref(fixDate(model.value))

function generateDateString(date: Date) {
	return (
		date.getFullYear() +
		'-' +
		String(date.getMonth() + 1).padStart(2, '0') +
		'-' +
		String(date.getDate()).padStart(2, '0')
	)
}

function fixDate(date?: Date | string | null) {
	if (typeof date === 'string') {
		const parsedDate = new Date(date)
		if (!isNaN(parsedDate.getTime())) {
			return generateDateString(parsedDate)
		}
		return null
	}

	if (date instanceof Date) {
		return generateDateString(date)
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
