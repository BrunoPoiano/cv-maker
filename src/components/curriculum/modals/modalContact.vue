<script setup lang="ts">
import { fontSizeSelect } from '@/constants/font-size'
import { ProviderKey } from '@/keys'
import { inject } from 'vue'
import Input from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'
import Select from '@/ui/appSelect.vue'
const { curriculum } = inject(ProviderKey)!
</script>

<template>
	<Modal
		buttonLabel="Contact"
		closeLabel="close"
		minWidth="40rem"
		buttonIcon="/svgs/pen.svg"
		v-if="curriculum"
	>
		<template #header>
			<h4>Contact</h4>
		</template>
		<form>
			<Select
				label="Font Size"
				:items="fontSizeSelect"
				v-model="curriculum.Contact.size"
			/>
			<Input
				type="checkbox"
				label="Side by Side"
				v-model="curriculum.Contact.sideBySide"
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
