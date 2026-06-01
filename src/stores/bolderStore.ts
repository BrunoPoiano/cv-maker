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
		const parsed = values.reduce<Array<string>>((acc, item) => {
			if (item !== '') {
				acc.push(item.trim())
			}
			return acc
		}, [])

		bolder.splice(0, bolder.length, ...parsed)
		saveDataToLocalStorage({ key: 'bolder', initialValue: parsed })
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
