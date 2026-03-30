<script setup lang="ts">
import { inject } from 'vue'

import { fontSizeSelect } from '@/constants/font-size'
import { ProviderKey } from '@/keys'
import Input from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'
import Select from '@/ui/appSelect.vue'
const { curriculum } = inject(ProviderKey)!

type Props = {
	id: string
}

const { id } = defineProps<Props>()
</script>

<template>
	<Modal :id="id" closeLabel="close" minWidth="35rem" v-if="curriculum">
		<template #header>
			<h3>Contact</h3>
		</template>
		<form>
			<div class="settings">
				<Input
					type="checkbox"
					label="Side by Side"
					v-model="curriculum.Contact.sideBySide"
				/>
				<Select
					fullWidth
					label="Font Size"
					:items="fontSizeSelect"
					v-model="curriculum.Contact.size"
				/>
			</div>
			<div>
				<Input
					label="email"
					type="email"
					placeholder="email"
					v-model="curriculum.Contact.value.email"
				/>
				<!-- <Input type="checkbox" label="bolder" v-model="curriculum.Contact.sideBySide" /> -->
			</div>
			<div>
				<Input
					type="text"
					label="linkedin"
					placeholder="linkedin"
					v-model="curriculum.Contact.value.linkedin"
				/>
				<!-- <Input type="checkbox" label="bolder" v-model="curriculum.Contact.sideBySide" /> -->
			</div>
			<div>
				<Input
					type="text"
					label="github"
					placeholder="github"
					v-model="curriculum.Contact.value.github"
				/>
				<!-- <Input type="checkbox" label="bolder" v-model="curriculum.Contact.sideBySide" /> -->
			</div>
		</form>
	</Modal>
</template>

<style scoped>
form {
	display: grid;
	gap: 1rem;

	> .settings {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
}
</style>
