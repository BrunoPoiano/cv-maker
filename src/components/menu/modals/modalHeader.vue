<script setup lang="ts">
import { inject } from 'vue'

import { fontSizeSelect } from '@/constants/font-size'
import { textAlignSelect } from '@/constants/text-align'
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
				<Select
					label="Text Align"
					:items="textAlignSelect"
					v-model="curriculum.Header.UserName.align"
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
				<Select
					label="Text Align"
					:items="textAlignSelect"
					v-model="curriculum.Header.Role.align"
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
@layer utilities {
	form {
		display: grid;
		gap: 2rem;

		> div {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1rem;
			background: var(--surface-container-low);
			padding: 0.8rem;
			border-radius: var(--border-radius);

			transition: background 500ms ease;

			&:hover {
				background: hsl(from var(--surface-container-low) h s calc(l - 2.75));
			}

			> div:has(input) {
				grid-area: 2 / span 2;
			}
		}
	}
}
</style>
