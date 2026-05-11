<script setup lang="ts">
import { inject } from 'vue'

import { fontSizeSelect } from '@/constants/font-size'
import { textAlignSelect } from '@/constants/text-align'
import { ProviderKey } from '@/keys'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { CurriculumStore } from '@/stores/curriculumStore'
import SvgDefault from '@/svgs/SvgDefault.vue'
import AppButton from '@/ui/appButton.vue'
import Input from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'
import Select from '@/ui/appSelect.vue'
const { curriculum } = inject(ProviderKey)!
const curriculumIndex = CurriculumIndexStore.get()
type Props = {
	id: string
}

const { id } = defineProps<Props>()
</script>

<template>
	<Modal :id="id" closeLabel="close" minWidth="35rem" v-if="curriculum">
		<template #header>
			<div class="header">
				<h3>Contact</h3>
				<Input
					type="checkbox"
					label="Side by Side"
					v-model="curriculum.Contact.sideBySide"
				/>
			</div>
		</template>
		<form>
			<div class="settings">
				<Select
					label="Text Align"
					:items="textAlignSelect"
					v-model="curriculum.Contact.align"
				/>

				<Select
					fullWidth
					label="Font Size"
					:items="fontSizeSelect"
					v-model="curriculum.Contact.size"
					fitContent
				/>
				<AppButton
					title="Set default values"
					icon-button
					@click="CurriculumStore.setContactDefaultValue(curriculumIndex)"
				>
					<SvgDefault />
				</AppButton>
			</div>
			<template v-for="(_, type) in curriculum.Contact.value" :key="type">
				<div>
					<Input
						type="text"
						:label="type"
						:placeholder="type"
						v-model="curriculum.Contact.value[type].value"
					/>
					<Input
						type="checkbox"
						label="bolder"
						v-model="curriculum.Contact.value[type].bolder"
					/>
				</div>
			</template>
		</form>
	</Modal>
</template>

<style scoped>
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
}

form {
	display: grid;
	gap: 1rem;

	> .settings {
		display: grid;
		gap: 1rem;
		grid-template-columns: 10ch 10ch 1fr;
		align-items: end;

		button {
			justify-self: end;
		}
	}

	> div:not(.settings) {
		background: var(--surface-container-low);
		padding: 0.8rem;
		border-radius: var(--border-radius);

		transition: background 500ms ease;

		&:hover {
			background: hsl(from var(--surface-container-low) h s calc(l - 2.75));
		}
	}
}
</style>
