<script setup lang="ts">
import { inject } from 'vue'

import {
	dateStyleSelect,
	monthOptionsSelect,
	yearOptionsSelect
} from '@/constants/dateOptions.ts'
import { fontSizeSelect } from '@/constants/font-size'
import { generateKey } from '@/helpers/generateKey'
import { ProviderKey } from '@/keys'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { CurriculumStore } from '@/stores/curriculumStore'
import SvgArrow from '@/svgs/svgArrow.vue'
import SvgDefault from '@/svgs/SvgDefault.vue'
import SvgNewDocument from '@/svgs/svgNewDocument.vue'
import SvgTrash from '@/svgs/svgTrash.vue'
import Button from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'
import AppPopover from '@/ui/appPopover.vue'
import Select from '@/ui/appSelect.vue'

import ExDateInput from './experience/components/exDateInput.vue'

type Props = {
	id: string
}

const { id } = defineProps<Props>()

const { curriculum } = inject(ProviderKey)!
const curriculumIndex = CurriculumIndexStore.get()

function newCourse() {
	curriculum.value.AcademicBackground.value.unshift({
		id: generateKey(5, 'number'),
		Course: '',
		Diploma: '',
		Institution: '',
		StartDate: null,
		EndDate: null
	})
}

function deleteCourse(id: string) {
	curriculum.value.AcademicBackground.value =
		curriculum.value.AcademicBackground.value.filter((item) => item.id !== id)
}

function closeModal() {
	curriculum.value.AcademicBackground.value.sort((cv1, cv2) => {
		if (cv1.StartDate && cv2.StartDate) {
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
		minWidth="50rem"
		:close-action="closeModal"
	>
		<template #header>
			<div class="modalHeader">
				<h3>
					<AppInput
						type="checkbox"
						label="Academic Background"
						v-model="curriculum.AcademicBackground.show"
					/>
				</h3>
				<AppPopover>
					<Button icon-button @click="newCourse">
						<SvgNewDocument />
					</Button>
					<template #popover>New Academic Background</template>
				</AppPopover>
			</div>
		</template>
		<form>
			<div class="align">
				<AppPopover>
					<Button
						icon-button
						@click="CurriculumStore.setAcademicDefaultValue(curriculumIndex)"
					>
						<SvgDefault />
					</Button>
					<template #popover>
						Set Company Name, Remote, Start and End Date to default values
					</template>
				</AppPopover>
			</div>
			<div class="size">
				<Select
					label="Size"
					:items="fontSizeSelect"
					v-model="curriculum.AcademicBackground.size"
				/>
				<Select
					label="Date Style"
					:items="dateStyleSelect"
					v-model="curriculum.AcademicBackground.dateStyle"
				/>
				<Select
					v-if="curriculum.AcademicBackground.dateStyle === 'date'"
					label="Month"
					:items="monthOptionsSelect"
					v-model="curriculum.AcademicBackground.dateMonth"
				/>
				<Select
					v-if="curriculum.AcademicBackground.dateStyle === 'date'"
					label="Year"
					:items="yearOptionsSelect"
					v-model="curriculum.AcademicBackground.dateYear"
				/>
			</div>

			<div
				v-for="(ab, index) in curriculum.AcademicBackground.value"
				class="academic"
				:key="ab.id"
			>
				<div class="directions">
					<Button
						iconButton
						@click="
							CurriculumStore.moveAcademicSkill(
								curriculumIndex,
								index,
								index - 1
							)
						"
						:disabled="index === 0"
					>
						<SvgArrow direction="up" />
					</Button>
					<Button
						iconButton
						@click="
							CurriculumStore.moveAcademicSkill(
								curriculumIndex,
								index,
								index + 1
							)
						"
						:disabled="index === curriculum.AcademicBackground.value.length - 1"
					>
						<SvgArrow direction="down" />
					</Button>
				</div>
				<Button
					icon-button
					@click="deleteCourse(ab.id)"
					hover-background="var(--red)"
					title="Delete Course"
				>
					<SvgTrash />
				</Button>

				<AppInput
					type="text"
					label="Institution"
					placeholder="Institution"
					v-model="ab.Institution"
				/>
				<AppInput
					type="text"
					label="Diploma"
					placeholder="Diploma"
					v-model="ab.Diploma"
				/>
				<AppInput
					type="text"
					label="Course"
					placeholder="Course"
					v-model="ab.Course"
				/>

				<ExDateInput
					type="date"
					label="Start Date"
					placeholder="Start Date"
					v-model="ab.StartDate"
				/>
				<ExDateInput
					type="date"
					label="End Date"
					placeholder="EndDate"
					v-model="ab.EndDate"
				/>
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

		.academic {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 0.8rem;
			background: var(--surface-container-low);

			padding: 0.8rem;
			border-radius: var(--border-radius);

			transition: background 500ms ease;

			.directions {
				grid-area: 1 / 1;
				display: flex;
				gap: 0.25rem;
			}

			button {
				grid-area: 1 / 2;
				justify-self: end;
			}

			&:hover {
				background: hsl(from var(--surface-container-low) h s calc(l - 2.75));
			}
		}
	}
}
</style>
