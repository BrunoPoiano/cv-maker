<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

import { ProfilesStore } from '@/stores/profileStore'
import SvgDrag from '@/svgs/svgDrag.vue'
import SvgTrash from '@/svgs/svgTrash.vue'
import type { Curriculum } from '@/types'
import AppButton from '@/ui/appButton.vue'
import AppModal from '@/ui/appModal.vue'
import { DragAndDrop } from '@/utilities/DragAndDrop'
type Props = {
	id: string
}

const { id } = defineProps<Props>()
const controller = ref<AbortController>()
const curriculums = computed(() => ProfilesStore.getCurriculums())
const cvList = computed(() =>
	curriculums.value.map((el, index) => cvLabel(el, index))
)

function cvLabel(cv: Curriculum, index?: number) {
	if (index != undefined) {
		const value = `${cv.Settings.language}${cv.Header.Role.value}`
			.toLocaleLowerCase()
			.replace(/[^\p{L}]+/gu, '')

		return `${value}-${index}`
	}

	return `${cv.Settings.language} - ${cv.Header.Role.value}`.toLocaleLowerCase()
}

function createDragAndDrop() {
	controller.value?.abort()
	return DragAndDrop({
		areaId: 'curriculumOrderUl',
		idPrefix: 'li-',
		itemsClass: 'liElement',
		itemsList: cvList.value,
		action: ProfilesStore.moveCurriculum
	})
}

onMounted(() => {
	controller.value = createDragAndDrop()
	onUnmounted(() => controller.value?.abort())
})

watch(cvList, async () => {
	await nextTick()
	controller.value?.abort()
	controller.value = createDragAndDrop()
})
</script>

<template>
	<AppModal :id="id" closeLabel="close">
		<template #header>
			<h3>Curriculums</h3>
		</template>
		<div class="content">
			<ul id="curriculumOrderUl">
				<li
					:id="`li-${cvLabel(cv, index)}`"
					:data-index="index"
					class="liElement"
					v-for="(cv, index) in curriculums"
					:key="cvLabel(cv, index)"
				>
					<div data-drag-handle draggable="true">
						<SvgDrag />
					</div>
					<span>
						{{ cvLabel(cv) }}
					</span>
					<AppButton
						iconButton
						hoverBackground="var(--red)"
						@click="ProfilesStore.deleteCurriculum(index)"
					>
						<SvgTrash />
					</AppButton>
				</li>
			</ul>
		</div>
	</AppModal>
</template>

<style scoped>
.content {
	max-height: 25rem;
	overflow-y: auto;
	padding: 0.5rem 1rem 0.5rem 0.5rem;
}
ul {
	padding: 0px;
	margin: 0px;
	li {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0.3rem;
		text-transform: capitalize;

		> [data-drag-handle] {
			width: 30px;
			aspect-ratio: 1;
		}
	}
}
</style>
