import { CurriculumConst } from '@/constants/curriculum'
import { fontSize } from '@/constants/font-size'
import { languages } from '@/constants/language'
import { monthOptions } from '@/constants/monthOptions'
import { generateKey } from '@/helpers/generateKey'
import type { Curriculum, Experience } from '@/types'

import {
	isBooleanOrDefault,
	isExtendedStringOrDefault,
	isNumberOrDefault,
	isObject,
	isOneOforDefault,
	isStringOrDefault
} from './typeValidation'

export function parseCurriculum(value: unknown): Curriculum {
	const cv = CurriculumConst()

	if (!isObject(value)) {
		return cv
	}

	if (isObject(value.Settings)) {
		cv.Settings.language = isOneOforDefault(
			value.Settings.language,
			languages,
			'en-us'
		)

		cv.Settings.margin = isNumberOrDefault(value.Settings.margin, 1)
		cv.Settings.gap = isNumberOrDefault(value.Settings.gap, 1.3)

		if (isObject(value.Settings.section)) {
			cv.Settings.section.size = isOneOforDefault(
				value.Settings.section.size,
				fontSize,
				'--font-size-md'
			)
		}
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
			if (isObject(value.Header.Role)) {
				cv.Header.Role = {
					value: isStringOrDefault(value.Header.Role.value, ''),
					size: isOneOforDefault(
						value.Header.Role.size,
						fontSize,
						'--font-size-xl'
					)
				}
			}
		}
	}

	if (isObject(value.Contact) && isObject(value.Contact.value)) {
		cv.Contact.size = isOneOforDefault(
			value.Contact.size,
			fontSize,
			'--font-size-sm'
		)
		cv.Contact.sideBySide = isBooleanOrDefault(value.Contact.sideBySide, false)

		if (isObject(value.Contact.value.email)) {
			cv.Contact.value.email = {
				value: isExtendedStringOrDefault(
					value.Contact.value.email.value,
					'email@email'
				),
				bolder: isBooleanOrDefault(value.Contact.value.email.bolder)
			}
		}

		if (isObject(value.Contact.value.linkedin)) {
			cv.Contact.value.linkedin = {
				value: isExtendedStringOrDefault(
					value.Contact.value.linkedin.value,
					'linkedin.com/in/'
				),
				bolder: isBooleanOrDefault(value.Contact.value.linkedin.bolder)
			}
		}

		if (isObject(value.Contact.value.github)) {
			cv.Contact.value.github = {
				value: isExtendedStringOrDefault(
					value.Contact.value.github.value,
					'github.com/in/'
				),
				bolder: isBooleanOrDefault(value.Contact.value.github.bolder)
			}
		}
	}

	if (isObject(value.CoreSkills)) {
		cv.CoreSkills.size = isOneOforDefault(
			value.CoreSkills.size,
			fontSize,
			'--font-size-md'
		)
		cv.CoreSkills.show = isBooleanOrDefault(value.CoreSkills.show, true)

		if (isObject(value.CoreSkills.skills)) {
			for (const key of Object.keys(value.CoreSkills.skills)) {
				const k = key.toLowerCase()
				if (Array.isArray(value.CoreSkills.skills[k])) {
					cv.CoreSkills.skills[k] = value.CoreSkills.skills[k]
						.map((item) => isStringOrDefault(item, undefined))
						.filter(Boolean)
				}
			}
		}
	}

	if (isObject(value.Summary)) {
		cv.Summary.size = isOneOforDefault(
			value.Summary.size,
			fontSize,
			'--font-size-md'
		)
		cv.Summary.show = isBooleanOrDefault(value.Summary.show, true)
		cv.Summary.smallText = isStringOrDefault(value.Summary.smallText, '')

		if (Array.isArray(value.Summary.value)) {
			cv.Summary.value = value.Summary.value.reduce((acc, item) => {
				acc.push(isStringOrDefault(item, undefined))
				return acc
			}, [])
		} else {
			cv.Summary.value = isStringOrDefault(value.Summary.value, '')
		}
	}

	if (isObject(value.Experience)) {
		cv.Experience.show = isBooleanOrDefault(value.Experience.show, true)
		cv.Experience.sideBySide = isBooleanOrDefault(
			value.Experience.sideBySide,
			false
		)
		cv.Experience.dateMonth = isOneOforDefault(
			value.Experience.dateMonth,
			monthOptions,
			'2-digit'
		)

		if (isObject(value.Experience.size)) {
			cv.Experience.size = {
				title: isOneOforDefault(
					value.Experience.size.title,
					fontSize,
					'--font-size-lg'
				),
				subTitle: isOneOforDefault(
					value.Experience.size.subTitle,
					fontSize,
					'--font-size-lg'
				),
				description: isOneOforDefault(
					value.Experience.size.description,
					fontSize,
					'--font-size-md'
				)
			}
		}
		if (Array.isArray(value.Experience.value)) {
			cv.Experience.value = value.Experience.value.reduce<
				Curriculum['Experience']['value']
			>((acc, item) => {
				if (!isObject(item)) {
					return acc
				}

				let desc: Experience['Description'] = []

				if (Array.isArray(item.Description)) {
					desc = item.Description.reduce<Array<string>>((accc, item) => {
						accc.push(isStringOrDefault(item, undefined))
						return accc
					}, [])
				} else {
					desc = isStringOrDefault(item.Description, '')
				}

				acc.push({
					id: isStringOrDefault(item.id, generateKey()),
					Role: isStringOrDefault(item.Role),
					CompanyName: isStringOrDefault(item.CompanyName),
					StartDate: new Date(item.StartDate as string),
					EndDate: item.EndDate ? new Date(item.EndDate as string) : null,
					Description: desc,
					Remote: isBooleanOrDefault(item.Remote, false)
				})
				return acc
			}, [])
		}
	}

	return cv
}

export function parseCurriculumList(value: unknown): Array<Curriculum> {
	if (!Array.isArray(value)) {
		return [CurriculumConst()]
	}

	const cvList = value
		.reduce<Array<Curriculum>>((acc, item) => {
			acc.push(parseCurriculum(item))
			return acc
		}, [])
		.sort((cv1) => (cv1.Settings.language === 'en-us' ? 0 : 1))

	return cvList
}
