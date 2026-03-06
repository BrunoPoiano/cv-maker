import type { Languages } from '@/types'
import { isOneOforDefault } from './typeValidation'
import { languages } from '@/constants/language'

export function parseLanguage(value: unknown): Languages {
	if (typeof value !== 'string') return 'en-us'

	return isOneOforDefault(value, languages, 'en-us')
}
