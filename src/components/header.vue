<script setup lang="ts">
import Modal from '../ui/modal.vue'
import Input from '../ui/input.vue'
import { inject } from 'vue'
import type { Curriculum } from '@/types'
import { CurriculumConst } from '@/constants/curriculum'
import { CurriculumKey } from '@/main'

const curriculum = inject<Curriculum>(CurriculumKey)
</script>

<template>
	<Modal
		buttonLabel="Header"
		closeLabel="close"
		minWidth="30rem"
		v-if="curriculum"
	>
		<template #header>
			<h4>Header</h4>
		</template>
		<form>
			<Input
				type="text"
				label="User Name"
				placeholder="User Name"
				v-model="curriculum.Header.UserName"
			/>
			<Input
				type="text"
				label="label"
				placeholder="Label"
				v-model="curriculum.Header.Label"
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
