<script setup lang="ts">
import Button from '@/ui/button.vue'
import { computed, provide, reactive, ref, type InjectionKey } from 'vue'

import Bolder from './components/modals/bolder.vue'

import CurriculumModel from './components/curriculum/index.vue'
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from './helpers/localstorage'
import { parseCurriculum, parseCurriculumList } from './parsers/curriculum'
import type { Curriculum, Languages } from './types'

import ColorScheme from './components/colorScheme.vue'
import { languagesSelect } from './constants/language'
import { ProviderKey } from './main'
import { parseBolder } from './parsers/bolder'
import { parseLanguage } from './parsers/language'
import Select from './ui/select.vue'
import { isNumberOrDefault } from './parsers/typeValidation'
import { CurriculumConst } from './constants/curriculum'
import Menu from './components/menu.vue'
import { deepClone } from './helpers/clone'
import Header from './components/header.vue'

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
