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
	<Modal :id="id" closeLabel="close" minWidth="30rem" v-if="curriculum">
		<template #header>
			<h3>Header</h3>
		</template>

		<form>
			<div>
				<Select
					label="Font Size"
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
					label="Font Size"
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
