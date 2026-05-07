import { Translate } from '@/constants/translations'
import { isValidDateOrNull } from '@/parsers/typeValidation'
import type { Curriculum, Languages, MonthOptions } from '@/types'

export function generateJobTitle(
	job: Curriculum['Experience']['value'][number]
): string {
	const role = job.Role.toLocaleLowerCase()
	const company = job.CompanyName.toLocaleLowerCase()

	return `${role} ${company ? ' - ' + company : ''} `
}

export function generateAcademicTitle(
	job: Curriculum['AcademicBackground']['value'][number]
): string {
	const course = job.Course.toLocaleLowerCase()
	const institution = job.Institution.toLocaleLowerCase()
	const diploma = job.Diploma.toLocaleLowerCase()

	return `${institution} ${diploma ? ' - ' + diploma : ''}${course ? ', ' + course : ''} `
}

export function generateDate(
	source:
		| Curriculum['Experience']['value'][number]
		| Curriculum['AcademicBackground']['value'][number],
	language: Languages,
	dateFormat: MonthOptions,
	showPresent = true
): string {
	const startDate = fixDate(source.StartDate, language, dateFormat)
	const endDate = source.EndDate
		? fixDate(source.EndDate, language, dateFormat)
		: showPresent
			? Translate['present'][language]
			: ''

	return `${startDate} ${endDate ? ' - ' + endDate : ''}`
}

export function fixDate(
	date: unknown,
	language: Languages,
	dateFormat: MonthOptions
): string {
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
