<script setup lang="ts">
import {
	dateStyleSelect,
	monthOptionsSelect,
	yearOptionsSelect
} from '@/constants/dateOptions'
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
			label="Experience"
			v-model="defaultConfig.Experience.show"
		/>
		<AppInput
			type="checkbox"
			label="Side by Side"
			v-model="defaultConfig.Experience.sideBySide"
		/>
		<AppSelect
			label="Title"
			:items="fontSizeSelect"
			v-model="defaultConfig.Experience.size.title"
		/>
		<AppSelect
			v-if="!defaultConfig.Experience.sideBySide"
			label="Subtitle"
			:items="fontSizeSelect"
			v-model="defaultConfig.Experience.size.subTitle"
		/>
		<AppSelect
			label="Description"
			:items="fontSizeSelect"
			v-model="defaultConfig.Experience.size.description"
		/>
		<AppSelect
			label="Date Style"
			:items="dateStyleSelect"
			v-model="defaultConfig.Experience.dateStyle"
		/>
		<AppSelect
			v-if="defaultConfig.Experience.dateStyle === 'date'"
			label="Month"
			:items="monthOptionsSelect"
			v-model="defaultConfig.Experience.dateMonth"
		/>
		<AppSelect
			v-if="defaultConfig.Experience.dateStyle === 'date'"
			label="Year"
			:items="yearOptionsSelect"
			v-model="defaultConfig.Experience.dateYear"
		/>
	</div>
</template>
