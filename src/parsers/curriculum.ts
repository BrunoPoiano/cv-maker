import type { Curriculum } from '@/types'
import {
	isExtendedStringOrDefault,
	isObject,
	isOneOf,
	isOneOforDefault,
	isStringOrDefault
} from './typeValidation'
import { CurriculumConst } from '@/constants/curriculum'
import { fontSize } from '@/constants/font-size'

export function parseCurriculum(value: unknown) {
	const cv = CurriculumConst

	if (!isObject(value)) {
		return cv
	}

	if (isObject(value.Header)) {
		if (isObject(value.Header.UserName)) {
			cv.Header.UserName = {
				value: isStringOrDefault(value.Header.UserName.value, ''),
				size: isOneOforDefault(
					value.Header.UserName.size,
					fontSize,
					'--font-size-xl'
				)
			}
			if (isObject(value.Header.Label)) {
				cv.Header.Label = {
					value: isStringOrDefault(value.Header.Label.value, ''),
					size: isOneOforDefault(
						value.Header.Label.size,
						fontSize,
						'--font-size-xl'
					)
				}
			}
		}
	}

	if (isObject(value.Contact)) {
		cv.Contact = {
			size: isOneOforDefault(value.Contact.size, fontSize, '--font-size-sm'),
			email: isExtendedStringOrDefault(value.Contact.email, 'email@email'),
			linkedin: isExtendedStringOrDefault(
				value.Contact.linkedin,
				'linkedin.com/in/'
			),
			github: isExtendedStringOrDefault(value.Contact.github, 'github.com/')
		}
	}

	if (isObject(value.CoreSkills)) {
		cv.CoreSkills.size = isOneOforDefault(
			value.CoreSkills.size,
			fontSize,
			'--font-size-md'
		)

		if (isObject(value.CoreSkills.skills)) {
			if (Array.isArray(value.CoreSkills.skills.languages)) {
				cv.CoreSkills.skills.languages =
					value.CoreSkills.skills.languages.reduce((acc, item) => {
						acc.push(isStringOrDefault(item, undefined))
						return acc
					}, [])
			}

			if (Array.isArray(value.CoreSkills.skills.apis)) {
				cv.CoreSkills.skills.apis = value.CoreSkills.skills.apis.reduce(
					(acc, item) => {
						acc.push(isStringOrDefault(item, undefined))
						return acc
					},
					[]
				)
			}

			if (Array.isArray(value.CoreSkills.skills.databases)) {
				cv.CoreSkills.skills.databases =
					value.CoreSkills.skills.databases.reduce((acc, item) => {
						acc.push(isStringOrDefault(item, undefined))
						return acc
					}, [])
			}

			if (Array.isArray(value.CoreSkills.skills.frontend)) {
				cv.CoreSkills.skills.frontend = value.CoreSkills.skills.frontend.reduce(
					(acc, item) => {
						acc.push(isStringOrDefault(item, undefined))
						return acc
					},
					[]
				)
			}

			if (Array.isArray(value.CoreSkills.skills.containers_devops)) {
				cv.CoreSkills.skills.containers_devops =
					value.CoreSkills.skills.containers_devops.reduce((acc, item) => {
						acc.push(isStringOrDefault(item, undefined))
						return acc
					}, [])
			}

			if (Array.isArray(value.CoreSkills.skills.practices)) {
				cv.CoreSkills.skills.practices =
					value.CoreSkills.skills.practices.reduce((acc, item) => {
						acc.push(isStringOrDefault(item, undefined))
						return acc
					}, [])
			}
		}
	}

	if (isObject(value.Summary)) {
		cv.Summary.size = isOneOforDefault(
			value.Summary.size,
			fontSize,
			'--font-size-md'
		)

		if (Array.isArray(value.Summary.value)) {
			cv.Summary.value = value.Summary.value.reduce((acc, item) => {
				acc.push(isStringOrDefault(item, undefined))
				return acc
			}, [])
		} else {
			cv.Summary.value = isStringOrDefault(value.Summary.value, '')
		}
	}

	if (Array.isArray(value.Experience)) {
		cv.Experience = value.Experience.reduce<Curriculum['Experience']>(
			(acc, item) => {
				if (!isObject(item)) {
					return acc
				}

				let desc: Array<string> = []

				if (Array.isArray(item.Description)) {
					desc = item.Description.reduce<Array<string>>((accc, item) => {
						accc.push(isStringOrDefault(item, undefined))
						return accc
					}, [])
				}

				acc.push({
					Label: isStringOrDefault(item.Label),
					CompanyName: isStringOrDefault(item.CompanyName),
					StartDate: new Date(item.StartDate as string),
					EndDate: item.EndDate ? new Date(item.EndDate as string) : null,
					Description: desc
				})
				return acc
			},
			[]
		)
	}

	return cv
}
