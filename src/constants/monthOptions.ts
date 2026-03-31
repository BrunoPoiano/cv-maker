import type { SelectItem } from '@/types'

export const monthOptions = ['2-digit', 'short', 'long'] as const

export const monthOptionsSelect = monthOptions.reduce<SelectItem>(
	(acc, item) => {
		acc.push({
			value: item,
			label: item.toUpperCase()
		})
		return acc
	},
	[]
)
