<script setup lang="ts">
import { computed, defineAsyncComponent, inject } from 'vue'

import { CurriculumConst } from '@/constants/curriculum'
import { deepClone } from '@/helpers/clone'
import { saveDataToLocalStorage } from '@/helpers/localstorage'
import { ProviderKey } from '@/keys'
import { parseCurriculum } from '@/parsers/curriculum'
import SvgCopy from '@/svgs/svgCopy.vue'
import SvgNewDocument from '@/svgs/svgNewDocument.vue'
import SvgSave from '@/svgs/svgSave.vue'
import SvgTrash from '@/svgs/svgTrash.vue'
import type { Curriculum } from '@/types'
import Button from '@/ui/appButton.vue'
import AppButton from '@/ui/appButton.vue'
import AppMenuModalItems from '@/ui/appMenuModalItems.vue'
import Select from '@/ui/appSelect.vue'
import AppToggle from '@/ui/appToggle.vue'

import { menuItems } from './menuItems'
const ModalBackup = defineAsyncComponent(
	() => import('./modals/modalBackup.vue')
)

const { curriculum, readonly } = inject(ProviderKey)!

const curriculumIndex = defineModel<number>('curriculum-index', {
	required: true
})
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

function updateIsEditable() {
	saveDataToLocalStorage({
		key: 'readonly',
		initialValue: readonly.value
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
			<AppMenuModalItems :menu-items="menuItems" />
			<AppButton modal id="modalMenuImportExport"> Import/Export </AppButton>
			<ModalBackup
				id="modalMenuImportExport"
				v-model:curriculum-list="curriculumList"
				v-model:curriculum-index="curriculumIndex"
			/>
			<AppToggle
				v-model="readonly"
				label-start="Readonly"
				:afterChange="updateIsEditable"
			/>
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
