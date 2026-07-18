<script setup lang="ts">
import { inject } from 'vue'

import { fontSizeSelect } from '@/constants/font-size'
import { a4gapSelect, marginListSelect } from '@/constants/spacings'
import { ProviderKey } from '@/keys'
import Modal from '@/ui/appModal.vue'
import Select from '@/ui/appSelect.vue'

import SettingsOrder from './components/settingsOrder.vue'

type Props = {
	id: string
}

const { curriculum } = inject(ProviderKey)!
const { id } = defineProps<Props>()
</script>

<template>
	<Modal :id="id" closeLabel="close" minWidth="30rem" v-if="curriculum">
		<template #header>
			<h3>Settings</h3>
		</template>
		<form>
			<Select
				label="Curriculum Margin"
				:items="marginListSelect"
				v-model="curriculum.Settings.margin"
			/>
			<Select
				label="Curriculum Gap"
				:items="a4gapSelect"
				v-model="curriculum.Settings.gap"
			/>
			<Select
				label="Section Header"
				:items="fontSizeSelect"
				v-model="curriculum.Settings.section.size"
			/>

			<SettingsOrder />
		</form>
	</Modal>
</template>

<style scoped>
@layer utilities {
	form {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr 1fr;

		> div {
			--_padding: 0.8rem;
			padding: var(--_padding);
			background: var(--surface-container-low);
			border-radius: var(--border-radius);

			&:hover {
				background: hsl(from var(--surface-container-low) h s calc(l - 2.75));
			}
		}
	}

	div:has(ul) {
		grid-column: span 2;

		ul {
			padding: 0px;

			li {
				display: flex;
				align-items: center;
				gap: 0.5rem;
			}
		}
	}
}
</style>
