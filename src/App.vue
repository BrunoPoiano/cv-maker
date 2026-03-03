<script setup lang="ts">
import { computed, provide, reactive, ref } from 'vue'

import CurriculumModel from './components/curriculum/cvIndex.vue'
import { getDataFromLocalStorage } from './helpers/localstorage'
import { parseCurriculum, parseCurriculumList } from './parsers/curriculum'

import ColorScheme from './components/colorScheme.vue'
import { ProviderKey } from './main'
import { parseBolder } from './parsers/bolder'
import { isNumberOrDefault } from './parsers/typeValidation'
import { CurriculumConst } from './constants/curriculum'
import Menu from './components/menuSection.vue'
import { deepClone } from './helpers/clone'
import Header from './components/headerSection.vue'

const curriculumList = reactive(
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

const curriculum = computed({
	get() {
		return (
			curriculumList[curriculumIndex.value] ??
			deepClone({ obj: CurriculumConst(), parseFunction: parseCurriculum })
		)
	},
	set(value) {
		curriculumList[curriculumIndex.value] = value
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
	curriculum,
	bolder
})
</script>

<template>
	<Header :curriculum="curriculum" />
	<Menu
		v-model:curriculum-index="curriculumIndex"
		v-model:curriculum-list="curriculumList"
	/>
	<CurriculumModel :key="curriculumIndex" />
	<footer>
		<ColorScheme />
	</footer>
</template>
