import { ref } from 'vue'

import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'
import { BooleanCheck } from '@/schemas/helpers'

const readonly = ref(
	getDataFromLocalStorage({
		key: 'readonly',
		parseFunction: (value: unknown) => {
			const check = BooleanCheck.safeParse(value)
			return check.success ? check.data : false
		},
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
