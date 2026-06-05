import type { BaseItem, SelectItem } from '@/types'

export const dateStyle = ['date', 'range'] as const
export const monthOptions = ['2-digit', 'short', 'long'] as const
export const yearOptions = ['2-digit', 'numeric'] as const

export const dateStyleSelect = dateStyle.reduce<SelectItem>((acc, item) => {
	acc.push({
		value: item,
		label: item.toUpperCase()
	})
	return acc
}, [])

const baseMonthOptions: BaseItem<(typeof monthOptions)[number]> = {
	'2-digit': {
		label: 'Numberic'
	},
	short: {
		label: 'Short Month'
	},
	long: {
		label: 'Long Month'
	}
}

export const monthOptionsSelect = monthOptions.reduce<SelectItem>(
	(acc, item) => {
		acc.push({
			value: item,
			label: baseMonthOptions[item].label
		})
		return acc
	},
	[]
)

const baseYearOptions: BaseItem<(typeof yearOptions)[number]> = {
	'2-digit': {
		label: 'Short Year'
	},
	numeric: {
		label: 'Long Year'
	}
}

export const yearOptionsSelect = yearOptions.reduce<SelectItem>((acc, item) => {
	acc.push({
		value: item,
		label: baseYearOptions[item].label
	})
	return acc
}, [])
