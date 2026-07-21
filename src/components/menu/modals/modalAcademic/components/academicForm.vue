<script setup lang="ts">
import { nextTick, onMounted, onUnmounted } from 'vue'

import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { ProfilesStore } from '@/stores/profileStore'
import SvgDrag from '@/svgs/svgDrag.vue'
import SvgTrash from '@/svgs/svgTrash.vue'
import type { Course } from '@/types'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import { DragAndDrop } from '@/utilities/DragAndDrop'

import ExDateInput from '../../experience/components/exDateInput.vue'

const curriculumIndex = CurriculumIndexStore.get()

type Props = {
	index: number
}

const props = defineProps<Props>()
const academicBackground = defineModel<Course>({
	required: true
})

defineOptions({
	inheritAttrs: false
})

onMounted(async () => {
	nextTick()
	const controller = DragAndDrop({
		areaId: 'academicList',
		idPrefix: 'academic-',
		itemsList: [academicBackground.value.id],
		itemsClass: 'academic',
		action: (fromIndex, toIndex) =>
			ProfilesStore.moveAcademicSkill(curriculumIndex.value, fromIndex, toIndex)
	})
	onUnmounted(() => controller.abort())
})
</script>

<template>
	<div
		class="academic"
		:data-index="props.index"
		:id="`academic-${academicBackground.id}`"
	>
		<div data-drag-handle draggable="true">
			<SvgDrag />
		</div>
		<AppButton
			icon-button
			@click="
				ProfilesStore.deleteAcademicSkill(
					curriculumIndex,
					academicBackground.id
				)
			"
			hover-background="var(--red)"
			title="Delete Course"
		>
			<SvgTrash />
		</AppButton>

		<AppInput
			type="text"
			label="Institution"
			placeholder="Institution"
			v-model="academicBackground.Institution"
		/>
		<AppInput
			type="text"
			label="Diploma"
			placeholder="Diploma"
			v-model="academicBackground.Diploma"
		/>
		<AppInput
			type="text"
			label="Course"
			placeholder="Course"
			v-model="academicBackground.Course"
		/>

		<ExDateInput
			type="date"
			label="Start Date"
			placeholder="Start Date"
			v-model="academicBackground.StartDate"
		/>
		<ExDateInput
			type="date"
			label="End Date"
			placeholder="EndDate"
			v-model="academicBackground.EndDate"
		/>
	</div>
</template>

<style scoped>
@layer utilities {
	.academic {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.8rem;
		background: var(--surface-container-low);

		padding: 0.8rem;
		border-radius: var(--border-radius);

		transition: background 500ms ease;

		button {
			grid-area: 1 / 2;
			justify-self: end;
		}

		&:hover {
			background: hsl(from var(--surface-container-low) h s calc(l - 2.75));
		}
	}
}
</style>
