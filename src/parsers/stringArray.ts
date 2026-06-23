import type { BolderWords, CurriculumIndex } from '@/types'

import {
	isNumberOrDefault,
	isObject,
	isStringOrDefault
} from './typeValidation'

export function parseStringArray(value: unknown): string[] {
	if (!Array.isArray(value)) return []

	return value.reduce((acc, item) => {
		const parsed = isStringOrDefault(item, undefined)
		if (parsed) {
			acc.push(parsed.trim())
		}
		return acc
	}, [])
}

export function parseBolderWords(value: unknown): BolderWords {
	if (!isObject(value)) return {}

	return Object.values(value).reduce<BolderWords>((acc, item, index) => {
		const words = parseStringArray(item)
		acc[index] = words
		return acc
	}, {})
}

export function parseCurriculumIndex(value: unknown): CurriculumIndex {
	if (!isObject(value)) return {}

	return Object.values(value).reduce<CurriculumIndex>((acc, item, index) => {
		acc[index] = isNumberOrDefault(item, 0)
		return acc
	}, {})
}
