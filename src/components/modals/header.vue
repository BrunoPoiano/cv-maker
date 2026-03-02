<script setup lang="ts">
import { fontSizeSelect } from '@/constants/font-size'
import { ProviderKey } from '@/main'
import type { Curriculum } from '@/types'
import { inject } from 'vue'
import Input from '@/ui/input.vue'
import Modal from '@/ui/modal.vue'
import Select from '@/ui/select.vue'
const { curriculum } = inject(ProviderKey)!
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
				<Select
					label="size"
					:items="fontSizeSelect"
					v-model="curriculum.Header.UserName.size"
				/>
				<Input
					type="text"
					label="Name"
					placeholder="User Name"
					v-model="curriculum.Header.UserName.value"
				/>
			</div>
			<div>
				<Select
					label="size"
					:items="fontSizeSelect"
					v-model="curriculum.Header.Role.size"
				/>
				<Input
					type="text"
					label="Role"
					placeholder="Role"
					v-model="curriculum.Header.Role.value"
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
