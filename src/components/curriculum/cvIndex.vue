<script setup lang="ts">
import { ProviderKey } from '@/keys'
import { h, inject } from 'vue'
import Contact from './components/cvContact.vue'
import Experience from './components/cvExperience.vue'
import Header from './components/cvHeader.vue'
import Summary from './components/cvSummary.vue'
import CoreSkills from './components/cvCoreSkills.vue'

import { languagesSelect } from '@/constants/language'
import Select from '@/ui/appSelect.vue'
import ExperienceModal from './modals/experience/modalExperience.vue'
import ContactModal from './modals/modalContact.vue'
import CoreSkillsModal from './modals/modalCoreSkills.vue'
import HeaderModal from './modals/modalHeader.vue'
import SummaryModal from './modals/modalSummary.vue'
import ModalSection from './modals/modalSection.vue'

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
</script>

<template>
	<nav class="menu">
		<ModalSection />
		<HeaderModal />
		<ContactModal />
		<SummaryModal />
		<CoreSkillsModal />
		<ExperienceModal />
		<Select :items="languagesSelect" v-model="curriculum.Settings.language" />
	</nav>
	<section class="a4-page page" id="curriculumPage">
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

	padding: 0.8cm;
	margin-inline: auto;
	margin-top: 2rem;

	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	box-sizing: border-box;

	background-color: #ffffff;

	border: 1px #d3d3d3 solid;
	border-radius: 5px;

	
}
</style>
