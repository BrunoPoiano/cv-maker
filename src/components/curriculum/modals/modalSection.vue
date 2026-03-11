<script setup lang="ts">
import { fontSizeSelect } from '@/constants/font-size'
import { ProviderKey } from '@/keys'
import { inject } from 'vue'
import Modal from '@/ui/appModal.vue'
import Select from '@/ui/appSelect.vue'
import SvgPen from '@/svgs/SvgPen.vue'
const { curriculum } = inject(ProviderKey)!
</script>

<template>
	<Modal
		buttonLabel="Section"
		closeLabel="close"
		minWidth="40rem"
		v-if="curriculum"
	>
		<template #buttonLabel> <SvgPen /> Section </template>
		<template #header>
			<h4>Sections</h4>
		</template>
		<form>
			<Select
				label="Font Size"
				:items="fontSizeSelect"
				v-model="curriculum.Settings.section.size"
			/>
		</form>
	</Modal>
</template>

<style scoped>
form {
	display: grid;
	gap: 1rem;
}
</style>
