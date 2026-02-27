<script setup lang="ts">
import { reactive, provide, type InjectionKey } from 'vue'
import Header from './components/header.vue'
import Contact from './components/contact.vue'
import Sumarry from './components/sumarry.vue'
import Button from '@/ui/button.vue'

import type { Curriculum } from './types'
import CurriculumModel from './components/curriculum/index.vue'
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from './helpers/localstorage'
import { parseCurriculum } from './parsers/curriculum'
import { CurriculumConst } from './constants/curriculum'
import { CurriculumKey } from './main'

const curriculum = reactive<Curriculum>(
	getDataFromLocalStorage('curriculum', parseCurriculum, CurriculumConst)
)
provide(CurriculumKey, curriculum)

function saveData() {
	saveDataToLocalStorage('curriculum', curriculum)
}

function savePDF() {
	window.print()
}
</script>

<template>
	<h1>CV-Maker</h1>
	<div class="menu">
		<Header />
		<Contact />
		<Sumarry />
		<Button @click="saveData" label="save" />
		<Button @click="savePDF" label="save PDF" />
	</div>
	<CurriculumModel />
</template>

<style scoped>
h1 {
	text-align: Center;
}

.menu {
	display: flex;
	gap: 0.8rem;
}
</style>
