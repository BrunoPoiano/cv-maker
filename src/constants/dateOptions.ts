import type { BaseItem, SelectItem } from '@/types'

export const dateStyle = ['date', 'range'] as const satisfies Array<string>
export const monthOptions = [
	'numeric',
	'2-digit',
	'long',
	'short',
	'narrow'
] as const satisfies Array<string>
export const yearOptions = [
	'2-digit',
	'numeric'
] as const satisfies Array<string>

export const dateStyleSelect = dateStyle.reduce<SelectItem>((acc, item) => {
	acc.push({
		value: item,
		label: item.toUpperCase()
	})
	return acc
}, [])

const baseMonthOptions: BaseItem<(typeof monthOptions)[number]> = {
	'2-digit': {
		label: '2 digit Numberic'
	},
	numeric: {
		label: 'Numberic'
	},
	short: {
		label: 'Short Month'
	},
	long: {
		label: 'Long Month'
	},
	narrow: {
		label: 'Narrow Month'
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
