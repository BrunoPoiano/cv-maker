<script setup lang="ts">
import { computed } from 'vue'

import { ProfilesStore } from '@/stores/profileStore'
import type { Curriculum } from '@/types'
import AppModal from '@/ui/appModal.vue'

import CvItem from './components/cvItem.vue'
type Props = {
	id: string
}

const { id } = defineProps<Props>()
const curriculums = computed(() => ProfilesStore.getCurriculums())

function cvLabel(cv: Curriculum, index?: number) {
	if (index != undefined) {
		const value = `${cv.Settings.language}${cv.Header.Role.value}`
			.toLocaleLowerCase()
			.replace(/[^\p{L}]+/gu, '')

		return `${value}-${index}`
	}

	return `${cv.Settings.language} - ${cv.Header.Role.value}`.toLocaleLowerCase()
}
</script>

<template>
	<AppModal :id="id" closeLabel="close">
		<template #header>
			<h3>Curriculums</h3>
		</template>
		<div class="content">
			<ul id="curriculumOrderUl">
				<CvItem
					v-for="(cv, index) in curriculums"
					:key="cvLabel(cv, index)"
					:index="index"
					:label="cvLabel(cv)"
					:labelIndex="cvLabel(cv, index)"
				/>
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
