import { ref, watch } from 'vue'

import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'
import { parseCurriculumIndex } from '@/parsers/stringArray'

import { ProfileIndexStore } from './profileIndexStore'

const curriculumIndex = ref(
	getDataFromLocalStorage({
		key: 'curriculumIndex',
		parseFunction: parseCurriculumIndex,
		initialValue: { 0: 0 }
	})
)

const currentCurriculumIndex = ref(
	curriculumIndex.value[ProfileIndexStore.get().value] || 0
)

watch(ProfileIndexStore.get(), (newIndex) => {
	currentCurriculumIndex.value = curriculumIndex.value[newIndex] || 0
})

export const CurriculumIndexStore = {
	get() {
		return currentCurriculumIndex
	},
	save() {
		saveDataToLocalStorage({
			key: 'curriculumIndex',
			initialValue: curriculumIndex.value
		})
	},
	changeValue(value: number | boolean) {
		const profileIndex = ProfileIndexStore.get().value

		if (!curriculumIndex.value[profileIndex]) {
			curriculumIndex.value[profileIndex] = 0
		}

		if (typeof value === 'boolean') {
			const newValue = value
				? curriculumIndex.value[profileIndex] + 1
				: curriculumIndex.value[profileIndex] == 0
					? 0
					: curriculumIndex.value[profileIndex] - 1

			currentCurriculumIndex.value = newValue
		} else {
			curriculumIndex.value[profileIndex] = value
			currentCurriculumIndex.value = value
		}

		this.save()
	}
}
