<script setup lang="ts">
import { fontSizeSelect } from '@/constants/font-size'
import { dateStyleSelect, monthOptionsSelect } from '@/constants/monthOptions'
import { textAlignSelect } from '@/constants/text-align'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { defaultConfigStore } from '@/stores/defaultConfig'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'
import Select from '@/ui/appSelect.vue'

type Props = {
	id: string
}

const { id } = defineProps<Props>()

const defaultConfig = defaultConfigStore.get()
const curriculumIndex = CurriculumIndexStore.get()
</script>

<template>
	<Modal :id="id" closeLabel="close" minWidth="40rem">
		<template #header>
			<h3>Default Configuration</h3>
		</template>
		<form>
			<div>
				<div>User Name</div>
				<Select
					label="Font Size"
					:items="fontSizeSelect"
					v-model="defaultConfig.Header.UserName.size"
				/>
				<Select
					label="Text Align"
					:items="textAlignSelect"
					v-model="defaultConfig.Header.UserName.align"
				/>
			</div>
			<div>
				<div>Role</div>
				<Select
					label="Font Size"
					:items="fontSizeSelect"
					v-model="defaultConfig.Header.Role.size"
				/>
				<Select
					label="Text Align"
					:items="textAlignSelect"
					v-model="defaultConfig.Header.Role.align"
				/>
			</div>
			<div>
				<div>Contact</div>
				<Select
					label="Text Align"
					:items="textAlignSelect"
					v-model="defaultConfig.Contact.align"
				/>
				<Select
					label="Font Size"
					:items="fontSizeSelect"
					v-model="defaultConfig.Contact.size"
				/>
			</div>
			<div>
				<AppInput
					type="checkbox"
					label="Summary"
					v-model="defaultConfig.Summary.show"
				/>
				<Select
					label="Font Size"
					:items="fontSizeSelect"
					v-model="defaultConfig.Summary.size"
				/>
			</div>
			<div>
				<AppInput
					type="checkbox"
					label="Core Skills"
					v-model="defaultConfig.CoreSkills.show"
				/>
				<AppInput
					type="checkbox"
					label="Side by Side"
					v-model="defaultConfig.CoreSkills.sideBySide"
				/>
				<Select
					label="Font Size"
					:items="fontSizeSelect"
					v-model="defaultConfig.CoreSkills.size"
				/>
			</div>
			<div>
				<AppInput
					type="checkbox"
					label="Experience"
					v-model="defaultConfig.Experience.show"
				/>
				<AppInput
					divStyle="align-self: center"
					type="checkbox"
					label="Side by Side"
					v-model="defaultConfig.Experience.sideBySide"
				/>
				<Select
					label="Title"
					:items="fontSizeSelect"
					v-model="defaultConfig.Experience.size.title"
				/>
				<Select
					v-if="!defaultConfig.Experience.sideBySide"
					label="Subtitle"
					:items="fontSizeSelect"
					v-model="defaultConfig.Experience.size.subTitle"
				/>
				<Select
					label="Description"
					:items="fontSizeSelect"
					v-model="defaultConfig.Experience.size.description"
				/>
				<Select
					label="Date Style"
					:items="dateStyleSelect"
					v-model="defaultConfig.Experience.dateStyle"
				/>
				<Select
					v-if="defaultConfig.Experience.dateStyle === 'date'"
					label="Month"
					:items="monthOptionsSelect"
					v-model="defaultConfig.Experience.dateMonth"
				/>
			</div>
			<div>
				<AppInput
					type="checkbox"
					label="Academic Background"
					v-model="defaultConfig.AcademicBackground.show"
				/>
				<Select
					label="Size"
					:items="fontSizeSelect"
					v-model="defaultConfig.AcademicBackground.size"
				/>
				<Select
					label="Date Style"
					:items="dateStyleSelect"
					v-model="defaultConfig.AcademicBackground.dateStyle"
				/>
				<Select
					v-if="defaultConfig.AcademicBackground.dateStyle === 'date'"
					label="Month"
					:items="monthOptionsSelect"
					v-model="defaultConfig.AcademicBackground.dateMonth"
				/>
			</div>
		</form>

		<template #footer>
			<AppButton @click="defaultConfigStore.setDefaultConfig(curriculumIndex)">
				set Values
			</AppButton>
			<AppButton @click="defaultConfigStore.save()"> Save </AppButton>
		</template>
	</Modal>
</template>

<style scoped>
@layer utilities {
	form {
		display: grid;
		gap: 1rem;

		> div {
			display: grid;
			gap: 1rem;
			grid-template-columns: 1fr 1fr 1fr;

			background: var(--surface-container-low);

			padding: 0.8rem;
			border-radius: var(--border-radius);

			> div:nth-child(1) {
				grid-area: 1 / span 3;
			}
		}
	}
}
</style>
