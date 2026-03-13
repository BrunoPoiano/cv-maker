<script setup lang="ts">
import { computed, defineAsyncComponent, inject } from 'vue'
import { saveDataToLocalStorage } from '@/helpers/localstorage'
import { ProviderKey } from '@/keys'
import type { Curriculum } from '@/types'
import Button from '@/ui/appButton.vue'
import Select from '@/ui/appSelect.vue'
import { deepClone } from '@/helpers/clone'
import { CurriculumConst } from '@/constants/curriculum'
import { parseCurriculum } from '@/parsers/curriculum'
import SvgCopy from '@/svgs/svgCopy.vue'
import SvgTrash from '@/svgs/svgTrash.vue'
import SvgSave from '@/svgs/svgSave.vue'
import SvgNewDocument from '@/svgs/svgNewDocument.vue'

const GeneratePrompt = defineAsyncComponent(
	() => import('./modals/modalGeneratePrompt.vue')
)
const Bolder = defineAsyncComponent(() => import('./modals/modalBolder.vue'))
const ModalBackup = defineAsyncComponent(
	() => import('./modals/modalBackup.vue')
)

const { curriculum } = inject(ProviderKey)!

const curriculumIndex = defineModel<number>('curriculum-index')
const curriculumList = defineModel<Curriculum[]>('curriculum-list', {
	required: true
})

const cvSelect = computed(() =>
	curriculumList.value.map((curriculum, index) => ({
		label: `${curriculum.Settings.language} - ${curriculum.Header.Role.value}`,
		value: index
	}))
)

function saveCurriculumIndex() {
	saveDataToLocalStorage({
		key: 'curriculumIndex',
		initialValue: curriculumIndex.value
	})
}

function saveData() {
	saveDataToLocalStorage({
		key: 'curriculumList',
		initialValue: curriculumList.value
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

	curriculumIndex.value = Math.min(
		curriculumIndex.value,
		curriculumList.value.length - 1
	)
}
</script>

<template>
	<nav class="menu">
		<div>
			<Select
				:items="cvSelect"
				v-model="curriculumIndex"
				@vue:updated="saveCurriculumIndex"
			/>

			<Bolder />
			<GeneratePrompt />
			<ModalBackup v-model:curriculumList="curriculumList" />
		</div>
		<div>
			<Button
				@click="deleteCv"
				:disabled="curriculumIndex === 0"
				hover-background="var(--red)"
			>
				<SvgTrash />
				delete
			</Button>
			<Button @click="copyCv" hover-background="var(--blue)">
				<SvgCopy />
				Copy
			</Button>
			<Button @click="newCv" hover-background="var(--green)">
				<SvgNewDocument />
				New
			</Button>
			<Button @click="saveData" hover-background="var(--green)">
				<SvgSave />
				Save
			</Button>
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
