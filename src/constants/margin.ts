import type { SelectItem } from '@/types'

export const marginList = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5] as const

export const marginListSelect = marginList.reduce<SelectItem>((acc, item) => {
	acc.push({
		value: item,
		label: `${item}cm`
	})
	return acc
}, [])
