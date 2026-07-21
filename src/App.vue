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
import { ColorSchemeStore } from './stores/colorSchemeStore'
import { CurriculumIndexStore } from './stores/curriculumIndexStore'
import { HueStore } from './stores/hueStore'
import { ProfilesStore } from './stores/profileStore'

const curriculumIndex = CurriculumIndexStore.get()

const currentCurriculum = computed({
	get() {
		return (
			ProfilesStore.getCurriculums()[curriculumIndex.value] ??
			deepClone({ obj: CurriculumConst(), parseFunction: parseCurriculum })
		)
	},
	set(value) {
		ProfilesStore.getCurriculums()[curriculumIndex.value] = value
	}
})

const skillsProxy = computed({
	get() {
		const source = currentCurriculum.value.CoreSkills.value

		const result = Object.entries(source).reduce(
			(acc, value) => {
				acc[value[0]] = value[1].length > 0 ? value[1].join(', ') : ''
				return acc
			},
			{} as Record<string, string>
		)

		return result
	},
	set(newSkills) {
		Object.entries(newSkills).forEach(([key, value]) => {
			currentCurriculum.value.CoreSkills.value[key] = value
				.split(',')
				.map((item) => item.trim())
				.filter((item) => item !== '')
		})
	}
})

function onInput(core: string, value?: string) {
	const newValue = value
		? value
				.split(',')
				.map((item) => item.trim())
				.filter((item) => item !== '')
		: []

	currentCurriculum.value.CoreSkills.value[core] = newValue
}

provide(ProviderSkillKey, {
	skillsProxy,
	onInput
})

provide(ProviderKey, {
	curriculum: currentCurriculum
})

onBeforeMount(() => {
	HueStore.set()
	ColorSchemeStore.set()
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
@layer utilities {
	section {
		display: grid;
		grid-template-columns: auto 1fr auto;

		grid-template-areas:
			'header header header'
			'menu profileMenu profileMenu'
			'menu submenu curriculumMenu'
			'menu curriculum curriculumMenu'
			'menu footer footer';
	}
}
</style>
