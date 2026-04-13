<script setup lang="ts">
import { computed, onBeforeMount, provide } from 'vue'

import { ProviderKey, ProviderSkillKey } from '@/keys'

import AppFooter from './components/appFooter.vue'
import CurriculumModel from './components/curriculum/cvIndex.vue'
import Header from './components/headerSection.vue'
import Menu from './components/menu/menuSection.vue'
import { CurriculumConst } from './constants/curriculum'
import { deepClone } from './helpers/clone'
import { parseCurriculum } from './parsers/curriculum'
import { CurriculumIndexStore } from './stores/curriculumIndexStore'
import { CurriculumStore } from './stores/curriculumStore'
import { HueStore } from './stores/hueStore'
import { ReadonlyStore } from './stores/readonlyStore'

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

	const result = Object.entries(source).reduce(
		(acc, value) => {
			acc[value[0]] = value[1].length > 0 ? value[1].join(', ') : ''
			return acc
		},
		{} as Record<string, string>
	)

	return result
})

function onInput(core: string, value?: string) {
	const newValue = value
		? value
				.split(',')
				.map((item) => item.trim())
				.filter((item) => item !== '')
		: []

	currentCurriculum.value.CoreSkills.skills[core] = newValue
}

provide(ProviderSkillKey, {
	skillsProxy,
	onInput
})

provide(ProviderKey, {
	curriculum: currentCurriculum,
	readonly,
	curriculumIndex: curriculumIndex.value
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
