<script setup lang="ts">
import { computed, inject } from 'vue'

import { ProviderKey } from '@/keys'

import CvContact from './components/cvContact.vue'
import CvCoreSkills from './components/cvCoreSkills.vue'
import CvExperience from './components/cvExperience.vue'
import CvHeader from './components/cvHeader.vue'
import CvSummary from './components/cvSummary.vue'

const { curriculum } = inject(ProviderKey)!
const margin = computed(() => curriculum.value.Settings.margin)
const gap = computed(() => curriculum.value.Settings.gap)
</script>

<template>
	<section>
		<div
			class="a4-page page"
			id="curriculumPage"
			:style="{ padding: `${margin}cm`, '--_a4-gap': `${gap}rem` }"
		>
			<CvHeader />
			<CvContact />
			<CvSummary />
			<CvCoreSkills />
			<CvExperience />
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
