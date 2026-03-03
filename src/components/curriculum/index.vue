<script setup lang="ts">
import { ProviderKey } from '@/main'
import { inject } from 'vue'
import Contact from './components/contact.vue'
import CoreSkills from './components/coreSkills.vue'
import Experience from './components/experience.vue'
import Header from './components/header.vue'
import Summary from './components/summary.vue'

import ContactModal from './modals/contact.vue'
import CoreSkillsModal from './modals/coreSkills.vue'
import HeaderModal from './modals/header.vue'
import SumarryModal from './modals/sumarry.vue'
import ExperienceModal from './modals/experience/index.vue'
import Select from '@/ui/select.vue'
import { languagesSelect } from '@/constants/language'
import { saveDataToLocalStorage } from '@/helpers/localstorage'

const { bolder, curriculum } = inject(ProviderKey)!

function boldMatches(value: string): string {
	if (!bolder.length) return value

	const escaped = bolder.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))

	const regex = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi')

	return value.replace(regex, '<b>$1</b>')
}

function saveLanguage() {
	saveDataToLocalStorage({
		key: 'language',
		initialValue: curriculum.value.language
	})
}
</script>

<template>
	<nav class="menu">
		<HeaderModal />
		<ContactModal />
		<SumarryModal />
		<CoreSkillsModal />
		<ExperienceModal />
		<Select
			:items="languagesSelect"
			v-model="curriculum.language"
			@change="saveLanguage"
		/>
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

	width: 21cm;
	min-height: 29.7cm;

	display: grid;
	place-content: start;
	gap: var(--_a4-gap);

	padding: 0.8cm 0px 0.8cm 0.8cm;
	margin-inline: auto;
	margin-top: 2rem;

	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	box-sizing: border-box;

	background-color: #ffffff;

	font-family: 'EB Garamond', serif;

	border: 1px #d3d3d3 solid;
	border-radius: 5px;
}
</style>
