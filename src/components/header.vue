<script setup lang="ts">
import Modal from '../ui/modal.vue'
import Input from '../ui/input.vue'
import Select from '../ui/select.vue'
import { inject } from 'vue'
import type { Curriculum } from '@/types'
import { CurriculumConst } from '@/constants/curriculum'
import { CurriculumKey } from '@/main'
import { fontSize, fontSizeSelect } from '@/constants/font-size'

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
			<div>
				<Input
					type="text"
					label="Name"
					placeholder="User Name"
					v-model="curriculum.Header.UserName.value"
				/>

				<Select
					label="size"
					:items="fontSizeSelect"
					v-model="curriculum.Header.UserName.size"
				/>
			</div>
			<div>
				<Input
					type="text"
					label="label"
					placeholder="Label"
					v-model="curriculum.Header.Label.value"
				/>
				<Select
					label="size"
					:items="fontSizeSelect"
					v-model="curriculum.Header.Label.size"
				/>
			</div>
		</form>
	</Modal>
</template>

<style scoped>
form {
	display: grid;
	gap: 2rem;

	> div {
		display: grid;
		gap: 1rem;
	}
}
</style>
