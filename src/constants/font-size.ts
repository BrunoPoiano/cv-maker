import type { SelectItem } from '@/types'

export const fontSize = [
	'--font-size-sm',
	'--font-size-base',
	'--font-size-md',
	'--font-size-lg',
	'--font-size-xl',
	'--font-size-xxl',
	'--font-size-xxxl',
	'--font-size-xxxxl'
] as const

export const fontSizeSelect = fontSize.reduce<SelectItem>((acc, item) => {
	acc.push({
		value: item as string,
		label: item.replace('--font-size-', '').toUpperCase()
	})
	return acc
}, [])
