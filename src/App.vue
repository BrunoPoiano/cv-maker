<script setup lang="ts">
import Button from '@/ui/button.vue'
import { computed, provide, reactive, ref, type InjectionKey } from 'vue'
import Bolder from './components/modals/bolder.vue'
import Contact from './components/modals/contact.vue'
import CoreSkills from './components/modals/coreSkills.vue'
import Header from './components/modals/header.vue'
import Sumarry from './components/modals/sumarry.vue'

import CurriculumModel from './components/curriculum/index.vue'
import { CurriculumConst } from './constants/curriculum'
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from './helpers/localstorage'
import { parseCurriculum, parseCurriculumList } from './parsers/curriculum'
import type { Languages } from './types'

import ColorScheme from './components/colorScheme.vue'
import Experience from './components/modals/experience/index.vue'
import { languagesSelect } from './constants/language'
import { ProviderKey } from './main'
import { parseBolder } from './parsers/bolder'
import { parseLanguage } from './parsers/language'
import Select from './ui/select.vue'

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
