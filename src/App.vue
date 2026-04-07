<script setup lang="ts">
import { computed, onBeforeMount, provide } from 'vue'

import { ProviderKey, ProviderSkillKey } from '@/keys'

import AppFooter from './components/appFooter.vue'
import CurriculumModel from './components/curriculum/cvIndex.vue'
import Header from './components/headerSection.vue'
import Menu from './components/menu/menuSection.vue'
import { CurriculumConst } from './constants/curriculum'
import { skillList } from './constants/skillList'
import { deepClone } from './helpers/clone'
import { parseCurriculum } from './parsers/curriculum'
import { CurriculumIndexStore } from './stores/curriculumIndexStore'
import { CurriculumStore } from './stores/curriculumStore'
import { HueStore } from './stores/hueStore'
import { ReadonlyStore } from './stores/readonlyStore'
import type { SkillsList } from './types'

const curriculumList = CurriculumStore.get()
const curriculumIndex = CurriculumIndexStore.get()
const readonly = ReadonlyStore.get()

const currentCurriculum = computed({
	get() {
		return (
			curriculumList.value[curriculumIndex.value] ??
			deepClone({ obj: CurriculumConst(), parseFunction: parseCurriculum })
		)
	},
	set(value) {
		curriculumList.value[curriculumIndex.value] = value
	}
})

const skillsProxy = computed(() => {
	const source = currentCurriculum.value.CoreSkills.skills
	const result: Record<SkillsList, string> = {
		languages: '',
		frontend: '',
		backend: '',
		databases: '',
		apis: '',
		containers_devops: '',
		practices: '',
		http_integrations: '',
		other: ''
	}

	for (const item of skillList) {
		const key = item.toLowerCase() as SkillsList
		result[key] = source[key]?.join(', ') ?? ''
	}

	return result
})

function onInput(core: SkillsList, value?: string) {
	currentCurriculum.value.CoreSkills.skills[core] = value
		? value
				.split(',')
				.map((item) => item.trim())
				.filter((item) => item !== '')
		: []
}

provide(ProviderSkillKey, {
	skillsProxy,
	onInput
})

provide(ProviderKey, {
	curriculum: currentCurriculum,
	readonly
})

onBeforeMount(() => {
	HueStore.set()
})
</script>

<template>
	<section>
		<Header />
		<Menu />
		<CurriculumModel :key="curriculumIndex" />
		<AppFooter />
	</section>
</template>

<style scoped>
section {
	display: grid;
	grid-template-columns: auto 1fr auto;

	grid-template-areas:
		'header header header'
		'menu submenu curriculumMenu'
		'menu curriculum curriculumMenu'
		'menu footer footer';
}
</style>
