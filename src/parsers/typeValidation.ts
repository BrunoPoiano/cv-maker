export type GenericObject = Record<string, unknown>

function isString(value: unknown): value is string {
	return typeof value === 'string'
}

export function isOneOf<T extends string>(
	value: T,
	array: T[] | readonly T[]
): value is T {
	return array.includes(value as T)
}

export function isOneOforDefault<T extends string>(
	value: unknown | string,
	array: T[] | readonly T[],
	defaultValue: T
): T {
	if (typeof value === 'string') {
		return isOneOf(value, array) ? (value as T) : defaultValue
	}
	return defaultValue
}

export function isNumber(value: unknown): value is number {
	return typeof value === 'number'
}

export function notEmptyString(value: unknown): value is string {
	return isString(value) && value.trim() !== ''
}

export function isStringOrDefault(value: unknown, defaultValue = ''): string {
	if (notEmptyString(value)) return value.trim()
	if (isNumber(value)) return value.toString()

	return defaultValue
}

export function isExtendedStringOrDefault<T extends string>(
	value: unknown,
	defaultValue: T
): T {
	if (notEmptyString(value)) return value.trim() as T
	if (isNumber(value)) return value.toString() as T

	return defaultValue as T
}

export function isNumberOrDefault<T extends number | undefined>(
	value: unknown,
	defaultValue?: T
): T extends number ? number : number | null {
	if (isNumber(value)) return value

	if (isString(value)) {
		const parsed = Number(value)
		if (!Number.isNaN(parsed)) {
			return parsed
		}
	}
	if (defaultValue !== undefined && typeof defaultValue === 'number') {
		return defaultValue
	}

	return null as T extends number ? number : number | null
}

export function isBooleanOrDefault(
	value: unknown,
	defaultValue = false
): boolean {
	if (typeof value === 'boolean') return value
	if (value === 1 || value === '1' || value === 'true') return true
	if (value === 0 || value === '0' || value === 'false') return false

	return defaultValue
}

export function isObject(data: unknown): data is GenericObject {
	return data !== null && typeof data === 'object'
}

export function isValidDateOrNull(value: unknown): Date | null {
	if (value instanceof Date) {
		return value
	}
	if (typeof value === 'string') {
		const date = new Date(value)
		if (!isNaN(date.getTime())) {
			return date
		}
	}

	return null
}
