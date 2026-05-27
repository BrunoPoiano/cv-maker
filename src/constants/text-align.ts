import type { SelectItem } from '@/types'

export const textAlign = ['start', 'center', 'end'] as const

export const textAlignSelect = textAlign.reduce<SelectItem>((acc, item) => {
	acc.push({
		value: item as string,
		label: item
	})
	return acc
}, [])
