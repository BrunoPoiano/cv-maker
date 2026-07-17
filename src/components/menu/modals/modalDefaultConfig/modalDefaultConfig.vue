<script setup lang="ts">
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { defaultConfigStore } from '@/stores/defaultConfig'
import AppButton from '@/ui/appButton.vue'
import Modal from '@/ui/appModal.vue'

import DefaultAcademic from './components/defaultAcademic.vue'
import DefaultContact from './components/defaultContact.vue'
import DefaultCoreSkills from './components/defaultCoreSkills.vue'
import DefaultExperience from './components/defaultExperience.vue'
import DefaultHeader from './components/defaultHeader.vue'
import DefaultOrder from './components/defaultOrder.vue'
import DefaultSettings from './components/defaultSettings.vue'
import DefaultSummary from './components/defaultSummary.vue'

type Props = {
	id: string
}

const { id } = defineProps<Props>()

const curriculumIndex = CurriculumIndexStore.get()
</script>

<template>
	<Modal :id="id" closeLabel="close">
		<template #header>
			<h3>Default Configuration</h3>
		</template>
		<form>
			<DefaultSettings />
			<DefaultOrder />
			<DefaultHeader />
			<DefaultContact />
			<DefaultSummary />
			<DefaultCoreSkills />
			<DefaultExperience />
			<DefaultAcademic />
			<div class="actions">
				<AppButton
					fitContent
					@click="defaultConfigStore.setDefaultConfig(curriculumIndex)"
				>
					set Values to Current Curriculum
				</AppButton>
				<AppButton
					fitContent
					@click="defaultConfigStore.setDefaultConfigToAll()"
				>
					set Values to All Curriculums
				</AppButton>
			</div>
		</form>
		<template #footer>
			<AppButton @click="defaultConfigStore.save()"> Save </AppButton>
		</template>
	</Modal>
</template>

<style scoped>
@layer utilities {
	form {
		display: grid;
		gap: 1rem;

		--_padding: 0.8rem;

		> div,
		> &:deep(div) {
			display: grid;
			gap: 1rem;
			align-items: start;

			background: var(--surface-container-low);
			padding: var(--_padding);
			border-radius: var(--border-radius);

			&:not(.actions, :has(ul)) {
				grid-template-columns: 1fr 1fr 1fr;

				> div:nth-child(1) {
					grid-area: 1 / span 3;
				}
			}

			> div:has(.header) {
				grid-area: 2 / span 3;
				display: grid;
				gap: 1rem;

				padding: 0px;
				padding-left: var(--_padding);

				.header {
					display: grid;
					gap: 1rem;
					grid-template-columns: 1fr 1fr 1fr;

					> div:nth-child(1) {
						grid-area: 1 / span 3;
					}
				}
			}
		}

		.actions {
			display: flex;
			gap: 1rem;
			justify-content: center;
		}

		:deep(ul) {
			padding-left: var(--_padding);
			margin: 0px;
			li {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				padding: 0.25rem 0.3rem;
				text-transform: capitalize;
			}
		}
	}
}
</style>
