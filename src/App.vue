<script setup lang="ts">
import { reactive, provide, type InjectionKey, computed, ref } from 'vue'
import Header from './components/modals/header.vue'
import Contact from './components/modals/contact.vue'
import Sumarry from './components/modals/sumarry.vue'
import Bolder from './components/modals/bolder.vue'
import CoreSkills from './components/modals/coreSkills.vue'
import Button from '@/ui/button.vue'

import type { Curriculum, Languages } from './types'
import CurriculumModel from './components/curriculum/index.vue'
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from './helpers/localstorage'
import { parseCurriculum } from './parsers/curriculum'
import { CurriculumConst } from './constants/curriculum'

import { parseBolder } from './parsers/bolder'
import Experience from './components/modals/experience/index.vue'
import ColorScheme from './components/colorScheme.vue'
import { ProviderKey } from './main'
import { parseLanguage } from './parsers/language'
import Select from './ui/select.vue'
import { languagesSelect } from './constants/language'

const curriculum = reactive(
	getDataFromLocalStorage({
		key: 'curriculum',
		parseFunction: parseCurriculum,
		initialValue: CurriculumConst
	})
)

const bolder = reactive(
	getDataFromLocalStorage({
		key: 'bolder',
		parseFunction: parseBolder,
		initialValue: []
	})
)
const language = ref(
	getDataFromLocalStorage<Languages>({
		key: 'language',
		parseFunction: parseLanguage,
		initialValue: 'pt'
	})
)

provide(ProviderKey, {
	curriculum,
	bolder,
	language
})

function saveData() {
	saveDataToLocalStorage({ key: 'curriculum', initialValue: curriculum })
}
function saveLanguage() {
	saveDataToLocalStorage({ key: 'language', initialValue: language.value })
}

function savePDF() {
	const originalTitle = document.title

	document.title =
		`${curriculum.Header.UserName.value}-${curriculum.Header.Role.value}`
			.toLocaleLowerCase()
			.replace(/\s+/g, '_')
	window.print()

	document.title = originalTitle
}

function calcgoldr() {
	const gr = [1, 1]

	for (let index = 1; index < 20; index++) {
		const oldValue = gr[index - 1] ?? 1

		const value = index + oldValue
		gr.push(value)
		console.log(value)
	}

	console.log(gr)
}
</script>

<template>
	<div class="header">
		<h1>
			<img src="/document.svg" alt="app logo" width="50" height="50" />
			CV-Maker
		</h1>
		<ColorScheme />
	</div>
	<nav class="menu">
		<div>
			<Header />
			<Contact />
			<Sumarry />
			<CoreSkills />
			<Experience />
			<Bolder />
			<Select
				:items="languagesSelect"
				v-model="language"
				@change="saveLanguage"
			/>
		</div>
		<div>
			<button @click="calcgoldr">calc</button>
			<Button @click="saveData">Save </Button>
			<Button @click="savePDF">Generate PDF </Button>
		</div>
	</nav>
	<CurriculumModel />
</template>

<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;

	h1 {
		margin: 0;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
}

.menu {
	display: flex;
	gap: 0.8rem;
	justify-content: space-between;

	div {
		display: flex;
		gap: 0.8rem;
	}
}
</style>
