<script setup lang="ts">
import { fontSizeSelect } from '@/constants/font-size'
import { ProviderKey } from '@/keys'
import { inject } from 'vue'
import Modal from '@/ui/appModal.vue'
import Select from '@/ui/appSelect.vue'
import SvgPen from '@/svgs/SvgPen.vue'
import { marginListSelect } from '@/constants/margin'
const { curriculum } = inject(ProviderKey)!
</script>

<template>
	<Modal
		buttonLabel="Section"
		closeLabel="close"
		minWidth="40rem"
		v-if="curriculum"
	>
		<template #buttonLabel> <SvgPen /> Settings </template>
		<template #header>
			<h4>Settings</h4>
		</template>
		<form>
			<Select
				label="Curriculum Margin"
				:items="marginListSelect"
				v-model="curriculum.Settings.margin"
			/>
			<Select
				label="Section Header"
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
