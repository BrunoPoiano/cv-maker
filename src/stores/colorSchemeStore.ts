import { ref } from 'vue'

import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'

const colorScheme = ref(
	getDataFromLocalStorage({
		key: 'theme',
		initialValue: 'light'
	})
)

export const ColorSchemeStore = {
	get() {
		return colorScheme
	},
	set() {
		document.documentElement.style.setProperty(
			'color-scheme',
			colorScheme.value
		)
	},
	change() {
		colorScheme.value = colorScheme.value === 'dark' ? 'light' : 'dark'

		document.documentElement.style.setProperty(
			'color-scheme',
			colorScheme.value
		)
		saveDataToLocalStorage({ key: 'theme', initialValue: colorScheme.value })
	}
}
