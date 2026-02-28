import { isStringOrDefault } from './typeValidation'

export function parseBolder(value: unknown): string[] {
	if (!Array.isArray(value)) return []

	return value.reduce((acc, item) => {
		acc.push(isStringOrDefault(item, undefined))
		return acc
	}, [])
}
