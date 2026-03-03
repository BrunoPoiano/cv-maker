<script setup lang="ts">
import { languagesSelect } from '@/constants/language'
import { saveDataToLocalStorage } from '@/helpers/localstorage'
import { ProviderKey } from '@/main'
import type { Curriculum, Languages } from '@/types'
import Button from '@/ui/button.vue'
import Select from '@/ui/select.vue'
import { computed, inject, type Reactive, type Ref } from 'vue'
import Bolder from './modals/bolder.vue'
import { deepClone } from '@/helpers/clone'
import { CurriculumConst } from '@/constants/curriculum'
import { parseCurriculum } from '@/parsers/curriculum'

const { curriculum, language } = inject(ProviderKey)!
1

const curriculumIndex = defineModel<number>('curriculum-index')
const curriculumList = defineModel<Curriculum[]>('curriculum-list', {
	required: true
})

const cvSelect = computed(() =>
	curriculumList.value.map((curriculum, index) => ({
		label: curriculum.Header.UserName.value || `Curriculum ${index + 1}`,
		value: index
	}))
)

function saveLanguage() {
	saveDataToLocalStorage({ key: 'language', initialValue: language.value })
}

function saveData() {
	saveDataToLocalStorage({
		key: 'curriculumList',
		initialValue: curriculumList
	})
}

function newCv() {
	curriculumList.value.push(
		deepClone({ obj: CurriculumConst(), parseFunction: parseCurriculum })
	)
	curriculumIndex.value = curriculumList.value.length - 1
}

function copyCv() {
	curriculumList.value.push(
		deepClone({
			obj: {
				...curriculum.value,
				Header: {
					...curriculum.value.Header,
					UserName: {
						...curriculum.value.Header.UserName,
						value: `${curriculum.value.Header.UserName.value} Copy`
					}
				}
			},
			parseFunction: parseCurriculum
		})
	)
	curriculumIndex.value = curriculumList.value.length - 1
}

function deleteCv() {
	if (!curriculumList.value.length) return
	if (curriculumIndex.value == null) return
	if (curriculumIndex.value === 0) return

	curriculumList.value.splice(curriculumIndex.value, 1)

	if (curriculumList.value.length === 0) {
		curriculumList.value.push(
			deepClone({ obj: CurriculumConst(), parseFunction: parseCurriculum })
		)
		curriculumIndex.value = 0
		return
	}

	curriculumIndex.value = Math.min(
		curriculumIndex.value,
		curriculumList.value.length - 1
	)
}
</script>

<template>
	<nav class="menu">
		<div>
			<Select :items="cvSelect" v-model="curriculumIndex" />
			<Select
				:items="languagesSelect"
				v-model="language"
				@change="saveLanguage"
			/>
			<Bolder />
		</div>
		<div>
			<Button @click="deleteCv" icon="/svgs/trash.svg">delete </Button>
			<Button @click="copyCv" icon="/svgs/copy.svg">Copy </Button>
			<Button @click="newCv" icon="/svgs/new-document.svg">New </Button>
			<Button @click="saveData" icon="/svgs/save.svg">Save </Button>
		</div>
	</nav>
</template>

<style scoped>
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
