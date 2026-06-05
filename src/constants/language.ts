import type { BaseItem, SelectItem } from '@/types'

export const languages = ['en-us', 'pt-br'] as const

const baseLanguages: BaseItem<(typeof languages)[number]> = {
	'en-us': {
		label: 'English'
	},
	'pt-br': {
		label: 'Portuguese'
	}
}

export const languagesSelect = languages.reduce<SelectItem>((acc, item) => {
	acc.push({
		value: item as string,
		label: baseLanguages[item].label
	})
	return acc
}, [])
