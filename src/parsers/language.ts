import type { Languages } from '@/types'
import { isOneOf, isOneOforDefault, isStringOrDefault } from './typeValidation'
import { languages } from '@/constants/language'

export function parseLanguage(value: unknown): Languages {

	if (typeof value !== "string") return "en"

	return isOneOforDefault(value, languages, "en")
}
