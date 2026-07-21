<script setup lang="ts">
import { dateStyleSelect, monthOptionsSelect } from '@/constants/dateOptions'
import { fontSizeSelect } from '@/constants/font-size'
import { defaultConfigStore } from '@/stores/defaultConfig'
import AppInput from '@/ui/appInput.vue'
import AppSelect from '@/ui/appSelect.vue'
const defaultConfig = defaultConfigStore.get()
</script>

<template>
	<div>
		<AppInput
			type="checkbox"
			label="Academic Background"
			v-model="defaultConfig.AcademicBackground.show"
		/>
		<AppSelect
			label="Size"
			:items="fontSizeSelect"
			v-model="defaultConfig.AcademicBackground.size"
		/>
		<AppSelect
			label="Date Style"
			:items="dateStyleSelect"
			v-model="defaultConfig.AcademicBackground.dateStyle"
		/>
		<AppSelect
			v-if="defaultConfig.AcademicBackground.dateStyle === 'date'"
			label="Month"
			:items="monthOptionsSelect"
			v-model="defaultConfig.AcademicBackground.dateMonth"
		/>
	</div>
</template>
