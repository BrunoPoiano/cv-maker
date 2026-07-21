<script setup lang="ts">
import { inject } from 'vue'

import { fontSizeSelect } from '@/constants/font-size'
import { ProviderKey } from '@/keys'
import AppInput from '@/ui/appInput.vue'
import AppSelect from '@/ui/appSelect.vue'

const { curriculum } = inject(ProviderKey)!
</script>

<template>
	<div class="settings">
		<AppInput
			type="checkbox"
			label="Side by Side"
			v-model="curriculum.CoreSkills.sideBySide"
		/>
		<AppSelect
			label="Font Size"
			:items="fontSizeSelect"
			v-model="curriculum.CoreSkills.size"
		/>
	</div>
</template>
<style scoped>
@layer utilities {
	.settings {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}
}
</style>
