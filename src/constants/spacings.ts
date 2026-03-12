import type { SelectItem } from '@/types'

export const marginListSelect = generateNumberArray(11, 'cm', 0, 0.2)

export const a4gapSelect = generateNumberArray(16, 'rem', 0.5, 0.1)

function generateNumberArray(
	quantity: number,
	unity: string,
	start: number = 0,
	interval: number = 1,
	fixed: number = 1
) {
	return Array.from(Array(quantity).keys()).reduce<SelectItem>(
		(acc, _, index) => {
			const value = (
				index === 0 ? start : Number(acc[index - 1]?.value) + interval
			)
				.toFixed(fixed)
				.replace(/\.?0+$/, '')

			acc.push({
				value: value,
				label: `${value}${unity}`
			})

			return acc
		},
		[]
	)
}
