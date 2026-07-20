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
			label="Summary"
			v-model="defaultConfig.Summary.show"
		/>
		<AppSelect
			label="Font Size"
			:items="fontSizeSelect"
			v-model="defaultConfig.Summary.size"
		/>
	</div>
</template>
