<script setup lang="ts">
import { inject } from 'vue'

import {
	dateStyleSelect,
	monthOptionsSelect,
	yearOptionsSelect
} from '@/constants/dateOptions'
import { fontSizeSelect } from '@/constants/font-size'
import { ProviderKey } from '@/keys'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { ProfilesStore } from '@/stores/profileStore'
import SvgDefault from '@/svgs/SvgDefault.vue'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import AppPopover from '@/ui/appPopover.vue'
import AppSelect from '@/ui/appSelect.vue'
import AppToggle from '@/ui/appToggle.vue'

const { curriculum } = inject(ProviderKey)!
const curriculumIndex = CurriculumIndexStore.get()

const list = defineModel<boolean>({
	required: true
})
</script>

<template>
	<div class="align">
		<AppInput
			divStyle="align-self: center"
			type="checkbox"
			label="Side by Side"
			v-model="curriculum.Experience.sideBySide"
		/>
		<AppToggle
			style="place-self: center"
			v-model="list"
			labelEnd="List"
			labelStart="Text"
		/>
		<AppPopover>
			<AppButton
				icon-button
				@click="ProfilesStore.setExperienceDefaultValue(curriculumIndex)"
			>
				<SvgDefault />
			</AppButton>
			<template #popover
				>Set Company Name, Remote, Start and End Date to default
				values</template
			>
		</AppPopover>
	</div>
	<div class="options">
		<AppSelect
			label="Title"
			:items="fontSizeSelect"
			v-model="curriculum.Experience.size.title"
		/>
		<AppSelect
			v-if="!curriculum.Experience.sideBySide"
			label="Subtitle"
			:items="fontSizeSelect"
			v-model="curriculum.Experience.size.subTitle"
		/>
		<AppSelect
			label="Description"
			:items="fontSizeSelect"
			v-model="curriculum.Experience.size.description"
		/>
		<AppSelect
			label="Date Style"
			:items="dateStyleSelect"
			v-model="curriculum.Experience.dateStyle"
		/>
		<AppSelect
			v-if="curriculum.Experience.dateStyle === 'date'"
			label="Month"
			:items="monthOptionsSelect"
			v-model="curriculum.Experience.dateMonth"
		/>
		<AppSelect
			v-if="curriculum.Experience.dateStyle === 'date'"
			label="Year"
			:items="yearOptionsSelect"
			v-model="curriculum.Experience.dateYear"
		/>
	</div>
</template>

<style>
@layer utilities {
	.align {
		display: grid;
		gap: 0.5rem;
		align-items: center;
		grid-template-columns: 1fr auto auto;
	}
	.options {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 0.8rem;
	}
}
</style>
