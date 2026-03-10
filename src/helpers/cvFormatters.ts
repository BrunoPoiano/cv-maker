import { Translate } from '@/constants/translations'
import { isValidDateOrNull } from '@/parsers/typeValidation'
import type { Curriculum, Languages, MonthOptions } from '@/types'

export function generateTitle(job: Curriculum['Experience']['value'][number]) {
	const role = job.Role.toLocaleLowerCase()
	const company = job.CompanyName.toLocaleLowerCase()

	return `${role} ${company ? ' - ' + company : ''} `
}

export function generateDate(
	job: Curriculum['Experience']['value'][number],
	language: Languages,
	dateFormat: MonthOptions
) {
	const startDate = fixDate(job.StartDate, language, dateFormat)
	const endDate = job.EndDate
		? fixDate(job.EndDate, language, dateFormat)
		: Translate['present'][language]

	return `${startDate} - ${endDate}`
}

export function fixDate(
	date: unknown,
	language: Languages,
	dateFormat: MonthOptions
) {
	const newDate = isValidDateOrNull(date)

	if (!newDate) return ''

	return newDate
		.toLocaleString(language, {
			month: dateFormat,
			year: 'numeric'
		})
		.split(' ')
		.join('/')
		.replace(/\/de/g, '')
		.replace('.', '')
}
