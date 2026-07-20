<script setup lang="ts">
import { fontSizeSelect } from '@/constants/font-size'
import { textAlignSelect } from '@/constants/text-align'
import { defaultConfigStore } from '@/stores/defaultConfig'
import AppSelect from '@/ui/appSelect.vue'
const defaultConfig = defaultConfigStore.get()
</script>

<template>
	<div>
		<div>Header</div>
		<div>
			<div class="header">
				<div>Name</div>
				<AppSelect
					label="Font Size"
					:items="fontSizeSelect"
					v-model="defaultConfig.Header.UserName.size"
				/>
				<AppSelect
					label="Text Align"
					:items="textAlignSelect"
					v-model="defaultConfig.Header.UserName.align"
				/>
			</div>
			<div class="header">
				<div>Role</div>
				<AppSelect
					label="Font Size"
					:items="fontSizeSelect"
					v-model="defaultConfig.Header.Role.size"
				/>
				<AppSelect
					label="Text Align"
					:items="textAlignSelect"
					v-model="defaultConfig.Header.Role.align"
				/>
			</div>
		</div>
	</div>
</template>
