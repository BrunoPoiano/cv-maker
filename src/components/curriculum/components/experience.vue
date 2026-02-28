<script setup lang="ts">
import type { Curriculum } from '@/types'
import List from '@/ui/list.vue'
import Paragraph from '@/ui/paragraph.vue'
import Title from './title.vue'
import { inject } from 'vue'
import { CurriculumConst } from '@/constants/curriculum'
import { CurriculumKey } from '@/main'

const { boldMatches } = defineProps<{ boldMatches: (v: string) => string }>()
const experience = inject<Curriculum>(CurriculumKey, CurriculumConst).Experience

function fixDate(date: unknown) {
	if (date instanceof Date) {
		return `${date.getMonth().toString().padStart(2, '0')}/${date.getFullYear()}`
	}

	if (typeof date === 'string') {
		const newDate = new Date(date)
		return `${newDate.getMonth().toString().padStart(2, '0')}/${newDate.getFullYear()}`
	}

	return ''
}
</script>

<template>
	<Title>PROFESSIONAL EXPERIENCE</Title>
	<div class="experience">
		<div v-for="job in experience">
			<span class="title">
				{{ job.Label }} - {{ job.CompanyName }} | {{ fixDate(job.StartDate) }} -
				{{ job.EndDate ? fixDate(job.EndDate) : 'atual' }}
			</span>
			<List
				:genericList="job.Description"
				v-if="Array.isArray(job.Description)"
				:boldMatches="boldMatches"
			/>
			<Paragraph v-else v-html="boldMatches(job.Description)" />
		</div>
	</div>
</template>

<style scoped>
.experience {
	display: grid;
	gap: 0.6rem;
	.title {
		color: black;
		display: block;
		font-size: 14px;
		font-weight: var(--font-weight);
		margin-bottom: 0.5rem;
	}
}
</style>
