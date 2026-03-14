<script setup lang="ts">
import { computed, defineAsyncComponent, h, inject } from 'vue'

import { languagesSelect } from '@/constants/language'
import { ProviderKey } from '@/keys'
import Select from '@/ui/appSelect.vue'

import Contact from './components/cvContact.vue'
import CoreSkills from './components/cvCoreSkills.vue'
import Experience from './components/cvExperience.vue'
import Header from './components/cvHeader.vue'
import Summary from './components/cvSummary.vue'

const ExperienceModal = defineAsyncComponent(
	() => import('./modals/experience/modalExperience.vue')
)
const ContactModal = defineAsyncComponent(
	() => import('./modals/modalContact.vue')
)
const CoreSkillsModal = defineAsyncComponent(
	() => import('./modals/modalCoreSkills.vue')
)
const HeaderModal = defineAsyncComponent(
	() => import('./modals/modalHeader.vue')
)
const SummaryModal = defineAsyncComponent(
	() => import('./modals/modalSummary.vue')
)
const modalSettings = defineAsyncComponent(
	() => import('./modals/modalSettings.vue')
)

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
	<nav class="menu">
		<modalSettings />
		<HeaderModal />
		<ContactModal />
		<SummaryModal />
		<CoreSkillsModal />
		<ExperienceModal />
		<Select :items="languagesSelect" v-model="curriculum.Settings.language" />
	</nav>
	<section
		class="a4-page page"
		id="curriculumPage"
		:style="{ padding: `${margin}cm`, '--_a4-gap': `${gap}rem` }"
	>
		<Header />
		<Contact />
		<Summary :boldMatches="boldMatches" />
		<CoreSkills :boldMatches="boldMatches" />
		<Experience :boldMatches="boldMatches" />
	</section>
</template>

<style scoped>
.menu {
	margin-inline: auto;
	display: flex;
	gap: 0.8rem;
	margin-top: 2rem;
}

.a4-page {
	--_a4-gap: 1.3rem;

	width: 230mm;
	min-height: 297mm;
	box-sizing: border-box;

	display: grid;
	align-content: baseline;
	gap: var(--_a4-gap);

	padding: 1cm;
	margin-inline: auto;
	margin-top: 2rem;

	box-shadow: 0 0 10px light-dark(rgba(0, 0, 0, 0.3), rgb(255, 255, 255, 0.3));
	box-sizing: border-box;
	background-color: var(--background);

	border: 1px light-dark(#d3d3d3, hsla(0, 0%, 16.9%)) solid;
	border-radius: calc(var(--border-radius) * 0.5);
}
</style>
