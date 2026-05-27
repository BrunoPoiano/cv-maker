import { CurriculumConst } from '@/constants/curriculum'
import { curriculumOrderArray } from '@/constants/curriculumOrder'
import { fontSize } from '@/constants/font-size'
import { languages } from '@/constants/language'
import { dateStyle, monthOptions } from '@/constants/monthOptions'
import { textAlign } from '@/constants/text-align'
import { generateKey } from '@/helpers/generateKey'
import type { Curriculum, Experience } from '@/types'

import {
	isBooleanOrDefault,
	isExtendedStringOrDefault,
	isNumberOrDefault,
	isObject,
	isOneOf,
	isOneOforDefault,
	isStringOrDefault,
	isValidDateOrNull
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

		if (Array.isArray(value.Settings.order)) {
			cv.Settings.order = value.Settings.order.reduce<
				Array<keyof Omit<Curriculum, 'Settings'>>
			>((acc, item) => {
				if (isOneOf(item, curriculumOrderArray)) {
					acc.push(item)
				}
				return acc
			}, [])
		}

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
				),
				align: isOneOforDefault(value.Header.UserName.align, textAlign, 'start')
			}
			if (isObject(value.Header.Role)) {
				cv.Header.Role = {
					value: isStringOrDefault(value.Header.Role.value, ''),
					size: isOneOforDefault(
						value.Header.Role.size,
						fontSize,
						'--font-size-lg'
					),
					align: isOneOforDefault(value.Header.Role.align, textAlign, 'start')
				}
			}
		}
	}

	if (isObject(value.Contact) && isObject(value.Contact.value)) {
		cv.Contact.sideBySide = isBooleanOrDefault(value.Contact.sideBySide, true)
		cv.Contact.size = isOneOforDefault(
			value.Contact.size,
			fontSize,
			'--font-size-sm'
		)
		cv.Contact.align = isOneOforDefault(value.Contact.align, textAlign, 'start')

		type ContactValue = keyof Curriculum['Contact']['value']

		for (const key of Object.keys(value.Contact.value)) {
			if (isObject(value.Contact.value[key])) {
				cv.Contact.value[key as ContactValue] = {
					value: isExtendedStringOrDefault(
						value.Contact.value[key].value,
						cv.Contact.value[key as ContactValue]?.value || ''
					),
					bolder: isBooleanOrDefault(value.Contact.value[key].bolder)
				}
			}
		}
	}

	if (isObject(value.CoreSkills)) {
		cv.CoreSkills.size = isOneOforDefault(
			value.CoreSkills.size,
			fontSize,
			'--font-size-sm'
		)
		cv.CoreSkills.show = isBooleanOrDefault(value.CoreSkills.show, true)
		cv.CoreSkills.sideBySide = isBooleanOrDefault(
			value.CoreSkills.sideBySide,
			false
		)

		if (isObject(value.CoreSkills.value)) {
			const coreSkills: Curriculum['CoreSkills']['value'] = {}

			for (const key of Object.keys(value.CoreSkills.value)) {
				const k = key.toLowerCase()
				if (Array.isArray(value.CoreSkills.value[k])) {
					coreSkills[k] = value.CoreSkills.value[k]
						.map((item) => isStringOrDefault(item, undefined))
						.filter(Boolean)
				}
			}

			cv.CoreSkills.value = coreSkills
		}
	}

	if (isObject(value.Summary)) {
		cv.Summary.size = isOneOforDefault(
			value.Summary.size,
			fontSize,
			'--font-size-sm'
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

		cv.Experience.dateStyle = isOneOforDefault(
			value.Experience.dateStyle,
			dateStyle,
			'date'
		)

		if (isObject(value.Experience.size)) {
			cv.Experience.size = {
				title: isOneOforDefault(
					value.Experience.size.title,
					fontSize,
					'--font-size-base'
				),
				subTitle: isOneOforDefault(
					value.Experience.size.subTitle,
					fontSize,
					'--font-size-sm'
				),
				description: isOneOforDefault(
					value.Experience.size.description,
					fontSize,
					'--font-size-sm'
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

				let desc: Experience['value'][number]['Description'] = []

				if (Array.isArray(item.Description)) {
					desc = item.Description.reduce<Array<string>>((accc, item) => {
						accc.push(isStringOrDefault(item, undefined))
						return accc
					}, [])
				} else {
					desc = isStringOrDefault(item.Description, '')
				}
				acc.push({
					id: isStringOrDefault(item.id, generateKey(5, 'number')),
					Role: isStringOrDefault(item.Role),
					CompanyName: isStringOrDefault(item.CompanyName),
					StartDate: isValidDateOrNull(item.StartDate),
					EndDate: isValidDateOrNull(item.EndDate),
					Description: desc,
					Remote: isBooleanOrDefault(item.Remote, false)
				})
				return acc
			}, [])
		}
	}

	if (isObject(value.AcademicBackground)) {
		cv.AcademicBackground.show = isBooleanOrDefault(
			value.AcademicBackground.show,
			true
		)

		cv.AcademicBackground.dateMonth = isOneOforDefault(
			value.AcademicBackground.dateMonth,
			monthOptions,
			'2-digit'
		)
		cv.AcademicBackground.dateStyle = isOneOforDefault(
			value.AcademicBackground.dateStyle,
			dateStyle,
			'date'
		)
		cv.AcademicBackground.size = isOneOforDefault(
			value.AcademicBackground.size,
			fontSize,
			'--font-size-sm'
		)

		if (Array.isArray(value.AcademicBackground.value)) {
			cv.AcademicBackground.value = value.AcademicBackground.value.reduce<
				Curriculum['AcademicBackground']['value']
			>((acc, item) => {
				if (!isObject(item)) {
					return acc
				}

				acc.push({
					id: isStringOrDefault(item.id, generateKey(5, 'number')),
					Course: isStringOrDefault(item.Course),
					Diploma: isStringOrDefault(item.Diploma),
					Institution: isStringOrDefault(item.Institution),
					StartDate: isValidDateOrNull(item.StartDate),
					EndDate: isValidDateOrNull(item.EndDate)
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

export function parseCurriculumToSave(value: Array<Curriculum>) {
	const newVcs = value.map((item) => {
		return {
			...item,
			AcademicBackground: {
				...item.AcademicBackground,
				value: item.AcademicBackground.value.map((ab) => {
					return {
						...ab,
						StartDate: ab.StartDate?.toJSON(),
						EndDate: ab.EndDate?.toJSON()
					}
				})
			},
			Experience: {
				...item.Experience,
				value: item.Experience.value.map((ab) => {
					return {
						...ab,
						StartDate: ab.StartDate?.toJSON(),
						EndDate: ab.EndDate?.toJSON()
					}
				})
			}
		}
	})

	console.log({ newVcs })
	return newVcs
}
