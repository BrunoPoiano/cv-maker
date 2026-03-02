import type { SelectItem } from '@/types'

export const languages = ['en', 'pt'] as const

export const languagesSelect = languages.reduce<SelectItem>((acc, item) => {
	acc.push({
		value: item as string,
		label: item === 'en' ? 'English' : 'Português'
	})
	return acc
}, [])
