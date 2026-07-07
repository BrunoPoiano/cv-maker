import type { Profile, ProfileDefaultConfig } from '@/types'

import { parseCurriculumList, parseDefaultConfig } from './curriculum'
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
			name: isStringOrDefault(item.name, ''),
			curriculums: parseCurriculumList(item.curriculums)
		})
		return acc
	}, [])
}

export function parseProfileDefaultConfig(
	value: unknown
): ProfileDefaultConfig {
	if (!isObject(value)) return {}

	return Object.values(value).reduce<ProfileDefaultConfig>(
		(acc, item, index) => {
			acc[index] = parseDefaultConfig(item)
			return acc
		},
		{}
	)
}
