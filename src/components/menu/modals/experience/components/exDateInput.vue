<script setup lang="ts">
import { Temporal } from '@js-temporal/polyfill'
import { ref } from 'vue'

import Input from '@/ui/appInput.vue'

const model = defineModel<Temporal.PlainDate | string | null>()

defineOptions({
	inheritAttrs: false
})

const date = ref(fixDate(model.value))

function generateDateString(date: Temporal.PlainDate) {
	return (
		date.year +
		'-' +
		String(date.month).padStart(2, '0') +
		'-' +
		String(date.day).padStart(2, '0')
	)
}

function fixDate(date?: Temporal.PlainDate | string | null) {
	if (typeof date === 'string') {
		const parsedDate = Temporal.PlainDate.from(date)
		return generateDateString(parsedDate)
	}

	if (date instanceof Temporal.PlainDate) {
		return generateDateString(date)
	}
	return null
}

function changeDate() {
	model.value = date.value ? Temporal.PlainDate.from(date.value) : null
}
</script>

<template>
	<Input v-bind="$attrs" v-model="date" @change="changeDate" />
</template>
