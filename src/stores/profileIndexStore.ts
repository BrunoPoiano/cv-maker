import { ref } from 'vue'

import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'
import { NumberCheck } from '@/schemas/helpers'

const profileIndex = ref(
	getDataFromLocalStorage({
		key: 'profileIndex',
		parseFunction: (value: unknown) => {
			const data = NumberCheck.safeParse(value)
			return data.success ? data.data : 0
		},
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
