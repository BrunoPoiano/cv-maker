import { ref } from 'vue'

import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'
import { isNumberOrDefault } from '@/parsers/typeValidation'

const curriculumIndex = ref(
	getDataFromLocalStorage({
		key: 'curriculumIndex',
		parseFunction: (value: unknown) => isNumberOrDefault(value, 0),
		initialValue: 0
	})
)

export const CurriculumIndexStore = {
	get() {
		return curriculumIndex
	},
	save() {
		saveDataToLocalStorage({
			key: 'curriculumIndex',
			initialValue: curriculumIndex.value
		})
	},
	changeValue(value: number | boolean) {
		const newValue =
			typeof value === 'number'
				? value
				: value
					? curriculumIndex.value + 1
					: curriculumIndex.value - 1
		curriculumIndex.value = newValue

		saveDataToLocalStorage({
			key: 'curriculumIndex',
			initialValue: newValue
		})
	}
}
