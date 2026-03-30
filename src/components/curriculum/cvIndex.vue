<script setup lang="ts">
import { computed, h, inject } from 'vue'

import { ProviderKey } from '@/keys'

import CvContact from './components/cvContact.vue'
import CvCoreSkills from './components/cvCoreSkills.vue'
import CvExperience from './components/cvExperience.vue'
import CvHeader from './components/cvHeader.vue'
import CvSummary from './components/cvSummary.vue'

const { bolder, curriculum } = inject(ProviderKey)!

function boldMatches(value: string) {
	if (!bolder.length) return value

	const escaped = bolder.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))

	const regex = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi')

	const parts = value.split(regex)

	return parts.map((part) =>
		bolder.some((b) => b.toLowerCase() === part.toLowerCase())
			? h('b', part)
			: part
	)
}

const margin = computed(() => curriculum.value.Settings.margin)
const gap = computed(() => curriculum.value.Settings.gap)
</script>

<template>
	<section>
		<div class="a4-page page" id="curriculumPage" :style="{ padding: `${margin}cm`, '--_a4-gap': `${gap}rem` }">
			<CvHeader />
			<CvContact />
			<CvSummary :boldMatches="boldMatches" />
			<CvCoreSkills :boldMatches="boldMatches" />
			<CvExperience :boldMatches="boldMatches" />
		</div>
	</section>
</template>

<style scoped>
section {
	background-color: var(--surface);

	.a4-page {
		grid-area: curriculum;
		--_a4-gap: 1.3rem;

		width: 230mm;
		min-height: 297mm;
		box-sizing: border-box;

		display: grid;
		align-content: baseline;
		gap: var(--_a4-gap);

		padding: 1cm;
		margin-inline: auto;
		margin-block: 2rem;

		box-sizing: border-box;
		background-color: light-dark(white, black);

		border: 1px var(--outline-variant) solid;
		border-radius: calc(var(--border-radius) * 0.5);
	}
}
</style>
