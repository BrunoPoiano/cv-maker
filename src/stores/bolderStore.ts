import { h, reactive } from 'vue'

import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'
import { parseStringArray } from '@/parsers/stringArray'

const bolder = reactive(
	getDataFromLocalStorage({
		key: 'bolder',
		parseFunction: parseStringArray,
		initialValue: []
	})
)

export const bolderStore = {
	get() {
		return bolder
	},
	save(values: string[]) {
		saveDataToLocalStorage({ key: 'bolder', initialValue: values })
	},
	matches(value: string) {
		if (!bolder.length) return value

		const escaped = bolder.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))

		const regex = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi')

		const parts = value.split(regex)

		return parts.map((part) =>
			bolder.some((b) => b.toLowerCase() === part.toLowerCase())
				? h('b', part)
				: part
		)
	}
}
