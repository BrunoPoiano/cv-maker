import type { SelectItem } from '@/types'

export const dateStyle = ['date', 'range'] as const
export const monthOptions = ['2-digit', 'short', 'long'] as const
export const yearOptions = ["2-digit", "numeric"] as const

export const dateStyleSelect = dateStyle.reduce<SelectItem>((acc, item) => {
	acc.push({
		value: item,
		label: item.toUpperCase()
	})
	return acc
}, [])

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


export const yearOptionsSelect = yearOptions.reduce<SelectItem>(
	(acc, item) => {
		acc.push({
			value: item,
			label: item.toUpperCase()
		})
		return acc
	},
	[]
)
