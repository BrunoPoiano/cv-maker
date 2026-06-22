import { ref } from 'vue'

import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'
import { isNumberOrDefault } from '@/parsers/typeValidation'

import { CurriculumIndexStore } from './curriculumIndexStore'

const profileIndex = ref(
	getDataFromLocalStorage({
		key: 'profileIndex',
		parseFunction: (value: unknown) => isNumberOrDefault(value, 0),
		initialValue: 0
	})
)

export const ProfileIndexStore = {
	get() {
		return profileIndex
	},
	save() {
		saveDataToLocalStorage({
			key: 'profileIndex',
			initialValue: profileIndex.value
		})
		CurriculumIndexStore.changeValue(0)
	},
	changeValue(value: number | boolean) {
		const newValue =
			typeof value === 'number'
				? value
				: value
					? profileIndex.value + 1
					: profileIndex.value - 1
		profileIndex.value = newValue

		saveDataToLocalStorage({
			key: 'profileIndex',
			initialValue: newValue
		})
	}
}
