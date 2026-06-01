import { ref } from 'vue'

import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'
import { isBooleanOrDefault } from '@/parsers/typeValidation'

const readonly = ref(
	getDataFromLocalStorage({
		key: 'readonly',
		parseFunction: (value: unknown) => isBooleanOrDefault(value, false),
		initialValue: true
	})
)
export const ReadonlyStore = {
	get() {
		return readonly
	},

	save() {
		saveDataToLocalStorage({
			initialValue: readonly.value,
			key: 'readonly'
		})
	}
}
