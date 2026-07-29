import type { CurriculumIndex } from '@/types'

import { isNumberOrDefault, isObject } from './typeValidation'

export function parseCurriculumIndex(value: unknown): CurriculumIndex {
	if (!isObject(value)) return {}

	return Object.values(value).reduce<CurriculumIndex>((acc, item, index) => {
		acc[index] = isNumberOrDefault(item, 0)
		return acc
	}, {})
}
