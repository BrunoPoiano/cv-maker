<script setup lang="ts">
import { computed } from 'vue'

import { saveDataToLocalStorage } from '@/helpers/localstorage'
import SvgDocument from '@/svgs/svgDocument.vue'
import type { Curriculum } from '@/types'
import Button from '@/ui/appButton.vue'
import AppSelect from '@/ui/appSelect.vue'

type Props = {
	curriculum: Curriculum
	readonly: boolean
}

const { curriculum, readonly } = defineProps<Props>()
const curriculumIndex = defineModel<number>('curriculum-index', {
	required: true
})
const curriculumList = defineModel<Curriculum[]>('curriculum-list', {
	required: true
})

const cvSelect = computed(() =>
	curriculumList.value.map((curriculum, index) => ({
		label: `${curriculum.Settings.language} - ${curriculum.Header.Role.value}`,
		value: index
	}))
)

function savePDF() {
	const originalTitle = document.title

	document.title =
		`${curriculum.Header.UserName.value}_${curriculum.Header.Role.value}`
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '_')
			.replace(/_+/g, '_')
			.replace(/-+/g, '_')

	window.print()

	document.title = originalTitle
}

function saveCurriculumIndex() {
	saveDataToLocalStorage({
		key: 'curriculumIndex',
		initialValue: curriculumIndex.value
	})
}
</script>

<template>
	<div class="header">
		<h1>
			<SvgDocument />
			CV-Maker
		</h1>
		<div>
			<AppSelect
				:items="cvSelect"
				v-model="curriculumIndex"
				@vue:updated="saveCurriculumIndex"
			/>
			<Button :disabled="!readonly" @click="savePDF" background="var(--primary)"
				>Generate PDF
			</Button>
		</div>
	</div>
</template>

<style scoped>
.header {
	grid-area: header;
	box-shadow: var(--shadow-ambient);
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	align-items: center;
	padding-inline: 0.5rem;

	h1 {
		margin: 0;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	> div {
		display: inline-flex;
		gap: 1rem;
	}
}
</style>
