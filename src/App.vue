<script setup lang="ts">
import { reactive, provide, type InjectionKey, computed } from 'vue'
import Header from './components/header.vue'
import Contact from './components/contact.vue'
import Sumarry from './components/sumarry.vue'
import Bolder from './components/bolder.vue'
import CoreSkills from './components/coreSkills.vue'
import Button from '@/ui/button.vue'

import type { Curriculum } from './types'
import CurriculumModel from './components/curriculum/index.vue'
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from './helpers/localstorage'
import { parseCurriculum } from './parsers/curriculum'
import { CurriculumConst } from './constants/curriculum'
import { BolderKey, CurriculumKey } from './main'
import { parseBolder } from './parsers/bolder'

const curriculum = reactive(
	getDataFromLocalStorage('curriculum', parseCurriculum, CurriculumConst)
)

const bolder = reactive(getDataFromLocalStorage('bolder', parseBolder, []))

provide(CurriculumKey, curriculum)
provide(BolderKey, bolder)

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
		<div>
			<Header />
			<Contact />
			<Sumarry />
			<CoreSkills />
			<Bolder />
		</div>
		<div>
			<Button @click="saveData" label="save" />
			<Button @click="savePDF" label="generate PDF" />
		</div>
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
	justify-content: space-between;
	div {
		display: flex;
		gap: 0.8rem;
	}
}
</style>
