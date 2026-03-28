<script setup lang="ts">
import { defineAsyncComponent, inject } from 'vue'

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
import appToggleText from '@/ui/appToggleText.vue'

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
		<AppMenuModalItems :menu-items="menuItems" />
		<AppButton modal id="modalMenuImportExport"> Import/Export </AppButton>
		<ModalBackup
			id="modalMenuImportExport"
			v-model:curriculum-list="curriculumList"
			v-model:curriculum-index="curriculumIndex"
		/>
	</nav>
	<nav class="curriculumMenu">
		<appToggleText
			v-model="readonly"
			label-start="Preview"
			label-end="Editor"
			:afterChange="updateIsEditable"
		/>

		<Button icon-button @click="copyCv" hover-background="var(--blue)">
			<SvgCopy />
		</Button>
		<Button icon-button @click="newCv" hover-background="var(--green)">
			<SvgNewDocument />
		</Button>
		<Button icon-button @click="saveData" hover-background="var(--green)">
			<SvgSave />
		</Button>
		<Button
			icon-button
			@click="deleteCv"
			:disabled="curriculumIndex === 0"
			hover-background="var(--red)"
		>
			<SvgTrash />
		</Button>
	</nav>
</template>

<style scoped>
.menu {
	grid-area: submenu;
	display: flex;
	gap: 1rem;

	padding-inline-start: 2rem;
	padding-block: 1rem;

	&:deep(.toggle-text) {
		margin-left: auto;
	}
}

.curriculumMenu {
	grid-area: curriculumMenu;
	position: sticky;
	top: 1rem;
	height: fit-content;

	padding-block-start: 1rem;
	padding-inline: 0.5rem;

	display: grid;
	align-content: flex-start;
	place-items: center;
	gap: 1.5rem;

	button:last-child {
		margin-top: 1rem;
	}
}
</style>
