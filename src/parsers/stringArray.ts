import { isStringOrDefault } from './typeValidation'

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
