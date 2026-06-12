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
] as const satisfies Array<string>

export const fontSizeSelect = fontSize.reduce<SelectItem>((acc, item) => {
	acc.push({
		value: item,
		label: item.replace('--font-size-', '').toUpperCase()
	})
	return acc
}, [])
