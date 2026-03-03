<script setup lang="ts">
import { saveDataToLocalStorage } from '@/helpers/localstorage'
import { ProviderKey } from '@/main'
import type { Curriculum } from '@/types'
import Button from '@/ui/button.vue'
import Select from '@/ui/select.vue'
import { computed, inject, type Reactive, type Ref } from 'vue'
import Bolder from './modals/bolder.vue'
import { deepClone } from '@/helpers/clone'
import { CurriculumConst } from '@/constants/curriculum'
import { parseCurriculum } from '@/parsers/curriculum'
import GeneratePrompt from './modals/generatePrompt.vue'

const { curriculum } = inject(ProviderKey)!

const curriculumIndex = defineModel<number>('curriculum-index')
const curriculumList = defineModel<Curriculum[]>('curriculum-list', {
	required: true
})

const cvSelect = computed(() =>
	curriculumList.value.map((curriculum, index) => ({
		label:
			`${curriculum.language} - ${curriculum.Header.Role.value}` ||
			`Curriculum ${index + 1}`,
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
		</div>
		<div>
			<Button
				@click="deleteCv"
				:disabled="curriculumIndex === 0"
				icon="/svgs/trash.svg"
				hover-background="var(--red)"
				>delete
			</Button>
			<Button
				@click="copyCv"
				hover-background="var(--blue)"
				icon="/svgs/copy.svg"
				>Copy
			</Button>
			<Button
				@click="newCv"
				hover-background="var(--green)"
				icon="/svgs/new-document.svg"
				>New
			</Button>
			<Button
				@click="saveData"
				hover-background="var(--green)"
				icon="/svgs/save.svg"
				>Save
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
