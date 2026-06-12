import { CapitalizeFirstLetter } from '@/helpers/cvFormatters'
import type { SelectItem } from '@/types'

export const textAlign = [
	'start',
	'center',
	'end'
] as const satisfies Array<string>

export const textAlignSelect = textAlign.reduce<SelectItem>((acc, item) => {
	acc.push({
		value: item,
		label: CapitalizeFirstLetter(item)
	})
	return acc
}, [])
