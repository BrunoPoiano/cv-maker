<script setup lang="ts">
import { computed, onBeforeMount, provide, reactive, ref } from 'vue'

import { ProviderKey, ProviderSkillKey } from '@/keys'

import AppFooter from './components/appFooter.vue'
import CurriculumModel from './components/curriculum/cvIndex.vue'
import Header from './components/headerSection.vue'
import Menu from './components/menu/menuSection.vue'
import { CurriculumConst } from './constants/curriculum'
import { skillList } from './constants/skillList'
import { deepClone } from './helpers/clone'
import { getDataFromLocalStorage } from './helpers/localstorage'
import { parseBolder } from './parsers/bolder'
import { parseCurriculum, parseCurriculumList } from './parsers/curriculum'
import { isBooleanOrDefault, isNumberOrDefault } from './parsers/typeValidation'
import type { SkillsList } from './types'

const curriculumList = ref(
	getDataFromLocalStorage({
		key: 'curriculumList',
		parseFunction: parseCurriculumList,
		initialValue: [
			deepClone({ obj: CurriculumConst(), parseFunction: parseCurriculum })
		]
	})
)

const curriculumIndex = ref(
	getDataFromLocalStorage({
		key: 'curriculumIndex',
		parseFunction: (value: unknown) => isNumberOrDefault(value, 0),
		initialValue: 0
	})
)

const readonly = ref(
	getDataFromLocalStorage({
		key: 'readonly',
		parseFunction: (value: unknown) => isBooleanOrDefault(value, false),
		initialValue: true
	})
)

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

const bolder = reactive(
	getDataFromLocalStorage({
		key: 'bolder',
		parseFunction: parseBolder,
		initialValue: []
	})
)

const skillsProxy = computed(() => {
	const source = currentCurriculum.value.CoreSkills.skills
	const result: Record<SkillsList, string> = {
		other: '',
		languages: '',
		frontend: '',
		backend: '',
		databases: '',
		apis: '',
		containers_devops: '',
		practices: '',
		http_integrations: ''
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

function setHue() {
	const hue = getDataFromLocalStorage({
		initialValue: 219,
		key: 'hue'
	})
	document.documentElement.style.setProperty('--app-hue', hue.toString())
}

provide(ProviderSkillKey, {
	skillsProxy,
	onInput
})

provide(ProviderKey, {
	curriculum: currentCurriculum,
	readonly,
	bolder
})

onBeforeMount(() => {
	setHue()
})
</script>

<template>
	<section>
		<Header
			:curriculum="currentCurriculum"
			:readonly="readonly"
			v-model:curriculum-index="curriculumIndex"
			v-model:curriculum-list="curriculumList"
		/>
		<Menu
			v-model:curriculum-index="curriculumIndex"
			v-model:curriculum-list="curriculumList"
		/>
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
