<script setup lang="ts">
import { inject, ref } from 'vue'

import {
	dateStyleSelect,
	monthOptionsSelect,
	yearOptionsSelect
} from '@/constants/dateOptions.ts'
import { fontSizeSelect } from '@/constants/font-size'
import { ProviderKey } from '@/keys'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { ProfilesStore } from '@/stores/profileStore'
import SvgDefault from '@/svgs/SvgDefault.vue'
import SvgNewDocument from '@/svgs/svgNewDocument.vue'
import SvgTrash from '@/svgs/svgTrash.vue'
import Button from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'
import AppPopover from '@/ui/appPopover.vue'
import Select from '@/ui/appSelect.vue'
import AppSmall from '@/ui/appSmall.vue'
import AppToggle from '@/ui/appToggle.vue'

import DateInput from './components/exDateInput.vue'
import Description from './components/exDescription.vue'

type Props = {
	id: string
}

const { id } = defineProps<Props>()

const { curriculum } = inject(ProviderKey)!
const curriculumIndex = CurriculumIndexStore.get()
const list = ref(
	Array.isArray(curriculum.value.Experience.value[0]?.Description)
)

function closeModal() {
	curriculum.value.Experience.value.sort((cv1, cv2) => {
		if (cv2.StartDate && cv1.StartDate) {
			return cv2.StartDate.year - cv1.StartDate.year
		}
		return 1
	})
}
</script>

<template>
	<Modal
		:id="id"
		closeLabel="close"
		:close-action="closeModal"
		minWidth="50rem"
	>
		<template #header>
			<div class="modalHeader">
				<h3>
					<AppInput
						type="checkbox"
						label="Experience"
						v-model="curriculum.Experience.show"
					/>
					<AppSmall>{{
						list ? 'Items will be separeted by line breaks' : ''
					}}</AppSmall>
				</h3>
				<AppPopover>
					<Button
						icon-button
						@click="ProfilesStore.newExperience(curriculumIndex)"
					>
						<SvgNewDocument />
					</Button>
					<template #popover>New Experience</template>
				</AppPopover>
			</div>
		</template>
		<form>
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
					<Button
						icon-button
						@click="ProfilesStore.setExperienceDefaultValue(curriculumIndex)"
					>
						<SvgDefault />
					</Button>
					<template #popover
						>Set Company Name, Remote, Start and End Date to default
						values</template
					>
				</AppPopover>
			</div>
			<div class="size">
				<Select
					label="Title"
					:items="fontSizeSelect"
					v-model="curriculum.Experience.size.title"
				/>
				<Select
					v-if="!curriculum.Experience.sideBySide"
					label="Subtitle"
					:items="fontSizeSelect"
					v-model="curriculum.Experience.size.subTitle"
				/>
				<Select
					label="Description"
					:items="fontSizeSelect"
					v-model="curriculum.Experience.size.description"
				/>
				<Select
					label="Date Style"
					:items="dateStyleSelect"
					v-model="curriculum.Experience.dateStyle"
				/>
				<Select
					v-if="curriculum.Experience.dateStyle === 'date'"
					label="Month"
					:items="monthOptionsSelect"
					v-model="curriculum.Experience.dateMonth"
				/>
				<Select
					v-if="curriculum.Experience.dateStyle === 'date'"
					label="Year"
					:items="yearOptionsSelect"
					v-model="curriculum.Experience.dateYear"
				/>
			</div>

			<div v-for="job in curriculum.Experience.value" class="job" :key="job.id">
				<div>
					<AppInput type="checkbox" label="Remote" v-model="job.Remote" />
					<Button
						icon-button
						@click="ProfilesStore.deleteExperience(curriculumIndex, job.id)"
						hover-background="var(--red)"
						title="Delete Experience"
					>
						<SvgTrash />
					</Button>
				</div>
				<div>
					<AppInput
						type="text"
						label="Company Name"
						placeholder="Company Name"
						v-model="job.CompanyName"
					/>
					<AppInput
						type="text"
						label="Role"
						placeholder="Role"
						v-model="job.Role"
					/>
				</div>
				<div>
					<DateInput
						type="date"
						label="Start Date"
						placeholder="Start Date"
						v-model="job.StartDate"
					/>
					<DateInput
						type="date"
						label="End Date"
						placeholder="EndDate"
						v-model="job.EndDate"
					/>
				</div>

				<div class="desc">
					<Description
						:list="list"
						label="Description"
						placeholder="Description"
						v-model="job.Description"
					/>
				</div>
			</div>
		</form>
	</Modal>
</template>

<style scoped>
@layer utilities {
	.modalHeader {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		gap: 0.8rem;

		h3 {
			display: grid;
		}

		:has(button) {
			place-self: end;
			align-self: start;
		}
	}

	form {
		display: grid;
		gap: 1rem;

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

		.job {
			display: grid;
			gap: 0.8rem;
			background: var(--surface-container-low);

			padding: 0.8rem;
			border-radius: var(--border-radius);

			transition: background 500ms ease;

			> div:not(.desc) {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 0.8rem;
			}

			> div:has(button) button {
				justify-self: end;
			}

			.desc {
				grid-column: 1 / -1;
			}

			&:hover {
				background: hsl(from var(--surface-container-low) h s calc(l - 2.75));
			}
		}
	}
}
</style>
