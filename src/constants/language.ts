import type { SelectItem } from '@/types'

export const languages = ['en-us', 'pt-br'] as const

export const languagesSelect = languages.reduce<SelectItem>((acc, item) => {
	acc.push({
		value: item as string,
		label: item === 'en-us' ? 'English' : 'Português'
	})
	return acc
}, [])
