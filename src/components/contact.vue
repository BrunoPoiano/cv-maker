<script setup lang="ts">
import type { Curriculum } from '@/types'
import Modal from '../ui/modal.vue'
import Input from '../ui/input.vue'
import Select from '../ui/select.vue'
import { inject } from 'vue'
import { CurriculumConst } from '@/constants/curriculum'
import { CurriculumKey } from '@/main'
import { fontSizeSelect } from '@/constants/font-size'
const curriculum = inject<Curriculum>(CurriculumKey)
</script>

<template>
	<Modal
		buttonLabel="Contact"
		closeLabel="close"
		minWidth="40rem"
		v-if="curriculum"
	>
		<template #header>
			<h4>Contact</h4>
		</template>
		<form>
			<Select
				label="size"
				:items="fontSizeSelect"
				v-model="curriculum.Contact.size"
			/>
			<Input
				label="email"
				type="email"
				placeholder="email"
				v-model="curriculum.Contact.email"
			/>
			<Input
				type="text"
				label="linkedin"
				placeholder="linkedin"
				v-model="curriculum.Contact.linkedin"
			/>
			<Input
				type="text"
				label="github"
				placeholder="github"
				v-model="curriculum.Contact.github"
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
