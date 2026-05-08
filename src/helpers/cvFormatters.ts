import { Translate } from '@/constants/translations'
import { isValidDateOrNull } from '@/parsers/typeValidation'
import type { Curriculum, Languages, MonthOptions } from '@/types'

type GenerateDateProps = {
	source:
		| Curriculum['Experience']['value'][number]
		| Curriculum['AcademicBackground']['value'][number]
	language: Languages
	dateFormat: MonthOptions
	showPresent: boolean
	range?: boolean
}

export function generateJobTitle(
	job: Curriculum['Experience']['value'][number]
): string {
	const role = job.Role.toLocaleLowerCase()
	const company = job.CompanyName.toLocaleLowerCase()

	return `${role}${company ? ' - ' + company : ''}`.trim()
}

export function generateAcademicTitle(
	job: Curriculum['AcademicBackground']['value'][number]
): string {
	const course = job.Course.toLocaleLowerCase()
	const institution = job.Institution.toLocaleLowerCase()
	const diploma = job.Diploma.toLocaleLowerCase()

	return `${institution}${diploma ? ' - ' + diploma : ''}${course ? ', ' + course : ''}`.trim()
}

export function generateDate({
	source,
	language,
	dateFormat,
	showPresent,
	range
}: GenerateDateProps): string {
	if (range && source.StartDate && source.EndDate) {
		return getYearsBetween(source.StartDate, source.EndDate, language)
	}

	const startDate = fixDate(source.StartDate, language, dateFormat)
	const endDate = source.EndDate
		? fixDate(source.EndDate, language, dateFormat)
		: showPresent
			? Translate['present'][language]
			: ''

	return `${startDate}${endDate ? ' - ' + endDate : ''}`.trim()
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

function getYearsBetween(
	startDate: Date,
	endDate: Date,
	language: Languages
): string {
	let years = endDate.getFullYear() - startDate.getFullYear()
	let months = endDate.getMonth() - startDate.getMonth()

	if (months < 0) {
		years--
		months += 12
	}

	const returnString = []
	if (years > 0) {
		returnString.push(years.toString())
		returnString.push(
			years > 1 ? Translate['years'][language] : Translate['year'][language]
		)
	}

	if (months > 0) {
		returnString.push(months.toString())
		returnString.push(
			months > 1 ? Translate['months'][language] : Translate['month'][language]
		)
	}

	return returnString.join(' ')
}
