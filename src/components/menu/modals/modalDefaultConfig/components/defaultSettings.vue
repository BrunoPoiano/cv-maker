<script setup lang="ts">
import { fontSizeSelect } from '@/constants/font-size'
import { a4gapSelect, marginListSelect } from '@/constants/spacings'
import { defaultConfigStore } from '@/stores/defaultConfig'
import AppSelect from '@/ui/appSelect.vue'
const defaultConfig = defaultConfigStore.get()
</script>

<template>
	<div>
		<div>Settings</div>
		<AppSelect
			label="Curriculum Margin"
			:items="marginListSelect"
			v-model="defaultConfig.Settings.margin"
		/>
		<AppSelect
			label="Curriculum Gap"
			:items="a4gapSelect"
			v-model="defaultConfig.Settings.gap"
		/>
		<AppSelect
			label="Section Header"
			:items="fontSizeSelect"
			v-model="defaultConfig.Settings.section.size"
		/>
	</div>
</template>
