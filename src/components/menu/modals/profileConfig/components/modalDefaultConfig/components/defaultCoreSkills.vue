<script setup lang="ts">
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
			label="Core Skills"
			v-model="defaultConfig.CoreSkills.show"
		/>
		<AppInput
			type="checkbox"
			label="Side by Side"
			v-model="defaultConfig.CoreSkills.sideBySide"
		/>
		<AppSelect
			label="Font Size"
			:items="fontSizeSelect"
			v-model="defaultConfig.CoreSkills.size"
		/>
	</div>
</template>
