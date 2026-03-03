<script setup lang="ts">
import type { BoldMatchReturn, Curriculum } from '@/types'
import List from '@/ui/appList.vue'
import Paragraph from '@/ui/appParagraph.vue'
import Title from './CvTitle.vue'
import { inject } from 'vue'
import { ProviderKey } from '@/main'
import AppBoldMatch from '@/ui/appBoldMatch.vue'

const { boldMatches } = defineProps<{
	boldMatches: (value: string) => BoldMatchReturn
}>()

const { curriculum } = inject(ProviderKey)!

function fixDate(date: unknown) {
	if (date instanceof Date) {
		return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
	}

	if (typeof date === 'string') {
		const newDate = new Date(date)
		return `${(newDate.getMonth() + 1).toString().padStart(2, '0')}/${newDate.getFullYear()}`
	}

	return ''
}

function generateTitle(job: Curriculum['Experience']['value'][number]) {
	const role = job.Role.toLocaleLowerCase()
	const company = job.CompanyName.toLocaleLowerCase()
	const startDate = fixDate(job.StartDate)
	const endDate = job.EndDate ? fixDate(job.EndDate) : 'atual'

	return `${role} ${company ? ' - ' + company : ''} | ${startDate} - ${endDate}`
}
</script>

<template>
	<div>
		<Title>{{
			curriculum.language === 'en' ? 'PROFESSIONAL EXPERIENCE' : 'Experiência'
		}}</Title>
		<div class="experience">
			<div
				v-for="job in curriculum.Experience.value"
				:key="job.CompanyName + job.Role"
			>
				<span
					class="title"
					:style="`font-size: var(${curriculum.Experience.size.title})`"
				>
					{{ generateTitle(job) }}
				</span>
				<List
					:genericList="job.Description"
					v-if="Array.isArray(job.Description)"
					:boldMatches="boldMatches"
					:fontSize="curriculum.Experience.size.description"
				/>
				<Paragraph v-else :fontSize="curriculum.Experience.size.description">
					<AppBoldMatch :value="boldMatches(job.Description)" />
				</Paragraph>
			</div>
		</div>
	</div>
</template>

<style scoped>
.experience {
	display: grid;
	gap: calc((var(--_a4-gap) * 0.5));

	.title {
		color: black;
		display: block;
		font-size: 14px;
		font-weight: var(--font-weight);
		margin-bottom: 0.5rem;
		text-transform: capitalize;
		margin-bottom: calc((var(--_a4-gap) * 0.4));
	}
}
</style>
