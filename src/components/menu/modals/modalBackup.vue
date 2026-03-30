<script setup lang="ts">
import { ref } from 'vue'

import { saveDataToLocalStorage } from '@/helpers/localstorage'
import { parseCurriculumList } from '@/parsers/curriculum'
import type { Curriculum } from '@/types'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'

type Props = {
	id: string
}

const { id } = defineProps<Props>()

const curriculumIndex = defineModel<number>('curriculum-index', {
	required: true
})
const curriculumList = defineModel<Curriculum[]>('curriculum-list', {
	required: true
})

const file = ref<File | null>(null)
const alert = ref<string | null>(null)

function exportFile() {
	const blob = new Blob([JSON.stringify(curriculumList.value, null, 2)], {
		type: 'application/json'
	})

	const url = URL.createObjectURL(blob)

	const link = document.createElement('a')
	link.href = url
	link.download = `curriculum_backup_${new Date().toISOString()}.json`
	link.click()

	URL.revokeObjectURL(url)
}

function importFile(e: Event) {
	const input = e.target as HTMLInputElement

	const inputFile = input.files?.[0]
	if (!inputFile) return

	const reader = new FileReader()
	reader.readAsText(inputFile)
	reader.onload = (event) => {
		try {
			const importedData = JSON.parse(event.target?.result as string)
			const newCvs = parseCurriculumList(importedData)

			saveDataToLocalStorage({
				key: 'curriculumList',
				initialValue: newCvs
			})

			curriculumList.value.splice(0, curriculumList.value.length, ...newCvs)
			alert.value = `imported successfully!`
			curriculumIndex.value = 0
		} catch (error) {
			console.error('Error parsing JSON:', error)
			alert.value = `Error updating file!`
		}
	}
}
</script>

<template>
	<Modal :id="id" closeLabel="close" minWidth="20rem" maxWidth="min(80ch,100%)" :openAction="() => {
			file = null
			alert = null
		}
		">
		<template #header>
			<h3>Import/Export</h3>
		</template>
		<form>
			<AppInput type="file" label="Import File" v-model="file" @change="importFile" :alert="alert ||
				'This action will replace the currently saved curriculum list'
				" accept=".json" />
			<pre>
		{{ curriculumList }}
	</pre>
		</form>
		<template #footer>
			<AppButton @click="exportFile">Export Json</AppButton>
		</template>
	</Modal>
</template>

<style scoped>
form {
	display: grid;
	gap: 1rem;
}

pre {
	overflow-y: auto;
	max-height: 60ch;
	white-space: normal;
}
</style>
