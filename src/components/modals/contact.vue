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
				v-model="curriculum.Contact.value.email"
			/>
			<Input
				type="text"
				label="linkedin"
				placeholder="linkedin"
				v-model="curriculum.Contact.value.linkedin"
			/>
			<Input
				type="text"
				label="github"
				placeholder="github"
				v-model="curriculum.Contact.value.github"
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
