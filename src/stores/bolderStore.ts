import { h, ref } from 'vue'

import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'
import { parseBolderWords } from '@/parsers/stringArray'

import { ProfileIndexStore } from './profileIndexStore'

const bolder = ref(
	getDataFromLocalStorage({
		key: 'bolder',
		parseFunction: parseBolderWords,
		initialValue: {}
	})
)

export const bolderStore = {
	get() {
		const profileIndex = ProfileIndexStore.get().value
		return bolder.value[profileIndex] || []
	},
	save(values: string[]) {
		const profileIndex = ProfileIndexStore.get().value

		const parsed = values.reduce<Array<string>>((acc, item) => {
			if (item !== '') {
				acc.push(item.trim())
			}
			return acc
		}, [])

		bolder.value[profileIndex] = parsed
		saveDataToLocalStorage({ key: 'bolder', initialValue: bolder.value })
	},
	matches(value: string) {
		const profileIndex = ProfileIndexStore.get().value

		if (!bolder.value[profileIndex] || !bolder.value[profileIndex].length) {
			return value
		}

		const escaped = bolder.value[profileIndex].map((t) =>
			t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
		)

		const regex = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi')

		const parts = value.split(regex)

		return parts.map((part) =>
			(bolder.value[profileIndex] || []).some(
				(b) => b.toLowerCase() === part.toLowerCase()
			)
				? h('b', part)
				: part
		)
	}
}
