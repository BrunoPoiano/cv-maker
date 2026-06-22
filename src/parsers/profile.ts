import type { Profile } from '@/types'

import {
	isNumberOrDefault,
	isObject,
	isStringOrDefault
} from './typeValidation'

export function parseProfiles(value: unknown): Array<Profile> {
	if (!Array.isArray(value)) return []

	return value.reduce<Array<Profile>>((acc, item) => {
		if (!isObject(item)) {
			return acc
		}

		const id = isNumberOrDefault(item.id)
		if (!id) {
			return acc
		}

		acc.push({
			id,
			name: isStringOrDefault(item.name, '')
		})
		return acc
	}, [])
}
