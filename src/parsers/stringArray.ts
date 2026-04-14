import { isStringOrDefault } from './typeValidation'

export function parseStringArray(value: unknown): string[] {
	if (!Array.isArray(value)) return []

	return value.reduce((acc, item) => {
		if (item === '') return acc

		acc.push(isStringOrDefault(item, undefined))
		return acc
	}, [])
}
