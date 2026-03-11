<script setup lang="ts">
import { fontSizeSelect } from '@/constants/font-size'
import { ProviderKey } from '@/keys'
import { inject } from 'vue'
import Input from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'
import Select from '@/ui/appSelect.vue'
import SvgPen from '@/svgs/SvgPen.vue'
const { curriculum } = inject(ProviderKey)!
</script>

<template>
	<Modal closeLabel="close" minWidth="30rem" v-if="curriculum">
		<template #buttonLabel> <SvgPen /> Header </template>
		<template #header>
			<h4>Header</h4>
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
