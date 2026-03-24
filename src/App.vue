<script setup lang="ts">
import { computed, provide, reactive, ref } from 'vue'

import { ProviderKey } from '@/keys'

import AppFooter from './components/appFooter.vue'
import CurriculumModel from './components/curriculum/cvIndex.vue'
import Header from './components/headerSection.vue'
import Menu from './components/menu/menuSection.vue'
import { CurriculumConst } from './constants/curriculum'
import { deepClone } from './helpers/clone'
import { getDataFromLocalStorage } from './helpers/localstorage'
import { parseBolder } from './parsers/bolder'
import { parseCurriculum, parseCurriculumList } from './parsers/curriculum'
import { isBooleanOrDefault, isNumberOrDefault } from './parsers/typeValidation'

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
		initialValue: false
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

provide(ProviderKey, {
	curriculum: currentCurriculum,
	readonly,
	bolder
})
</script>

<template>
	<Header :curriculum="currentCurriculum" :readonly="readonly" />
	<Menu
		v-model:curriculum-index="curriculumIndex"
		v-model:curriculum-list="curriculumList"
	/>
	<CurriculumModel :key="curriculumIndex" />
	<AppFooter />
</template>
