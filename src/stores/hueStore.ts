import { ref } from 'vue'

import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'

const hue = ref(
	getDataFromLocalStorage({
		initialValue: 219,
		key: 'hue'
	})
)

export const HueStore = {
	get() {
		return hue
	},
	set() {
		document.documentElement.style.setProperty(
			'--app-hue',
			hue.value.toString()
		)
	},
	save() {
		saveDataToLocalStorage({
			initialValue: hue.value,
			key: 'hue'
		})
	}
}
