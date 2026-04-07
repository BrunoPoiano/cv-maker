<script setup lang="ts">
import { inject } from 'vue'

import { fontSizeSelect } from '@/constants/font-size'
import { a4gapSelect, marginListSelect } from '@/constants/spacings'
import { ProviderKey } from '@/keys'
import { HueStore } from '@/stores/hueStore'
import AppInput from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'
import Select from '@/ui/appSelect.vue'
const { curriculum } = inject(ProviderKey)!

type Props = {
	id: string
}

const { id } = defineProps<Props>()

const colorRange = HueStore.get()

function handleColorChange() {
	HueStore.set()
	HueStore.save()
}
</script>

<template>
	<Modal
		:id="id"
		buttonLabel="Section"
		closeLabel="close"
		minWidth="30rem"
		v-if="curriculum"
	>
		<template #header>
			<h3>Settings</h3>
		</template>
		<form>
			<Select
				label="Curriculum Margin"
				:items="marginListSelect"
				v-model="curriculum.Settings.margin"
			/>
			<Select
				label="Curriculum Gap"
				:items="a4gapSelect"
				v-model="curriculum.Settings.gap"
			/>
			<Select
				label="Section Header"
				:items="fontSizeSelect"
				v-model="curriculum.Settings.section.size"
			/>
			<AppInput
				label="App Color"
				type="range"
				v-model="colorRange"
				max="360"
				min="1"
				@change="handleColorChange"
			/>
		</form>
	</Modal>
</template>

<style scoped>
form {
	display: grid;
	gap: 1rem;
	grid-template-columns: 1fr 1fr;
}
</style>
