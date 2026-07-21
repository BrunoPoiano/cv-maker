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
import AppPopover from '@/ui/appPopover.vue'
import AppSelect from '@/ui/appSelect.vue'

const { curriculum } = inject(ProviderKey)!
const curriculumIndex = CurriculumIndexStore.get()
</script>

<template>
	<div class="align">
		<AppPopover>
			<AppButton
				icon-button
				@click="ProfilesStore.setAcademicDefaultValue(curriculumIndex)"
			>
				<SvgDefault />
			</AppButton>
			<template #popover>
				Set Company Name, Remote, Start and End Date to default values
			</template>
		</AppPopover>
	</div>
	<div class="size">
		<AppSelect
			label="Size"
			:items="fontSizeSelect"
			v-model="curriculum.AcademicBackground.size"
		/>
		<AppSelect
			label="Date Style"
			:items="dateStyleSelect"
			v-model="curriculum.AcademicBackground.dateStyle"
		/>
		<AppSelect
			v-if="curriculum.AcademicBackground.dateStyle === 'date'"
			label="Month"
			:items="monthOptionsSelect"
			v-model="curriculum.AcademicBackground.dateMonth"
		/>
		<AppSelect
			v-if="curriculum.AcademicBackground.dateStyle === 'date'"
			label="Year"
			:items="yearOptionsSelect"
			v-model="curriculum.AcademicBackground.dateYear"
		/>
	</div>
</template>

<style scoped>
@layer utilities {
	.align {
		display: grid;
		gap: 0.5rem;
		align-items: center;
		grid-template-columns: 1fr auto auto;
	}
	.size {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 0.8rem;
	}
}
</style>
