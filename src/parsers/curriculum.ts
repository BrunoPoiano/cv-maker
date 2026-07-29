import { CurriculumConst } from '@/constants/curriculum'
import { curriculumOrderArray } from '@/constants/curriculumOrder'
import { dateStyle, monthOptions, yearOptions } from '@/constants/dateOptions'
import { DefaultConfigConst } from '@/constants/defaultConfig'
import { fontSize } from '@/constants/font-size'
import { textAlign } from '@/constants/text-align'
import { parseSchemaArray, parseSchemaObj } from '@/helpers/schemaParser'
import { CurriculumSchema } from '@/schemas/curriculum'
import type { Curriculum, DefaultConfig } from '@/types'

import {
	isBooleanOrDefault,
	isNumberOrDefault,
	isObject,
	isOneOf,
	isOneOforDefault,
	isStringOrDefault
} from './typeValidation'

export function parseCurriculum(value: unknown): Curriculum {
	const cv = CurriculumConst()
	return parseSchemaObj(value, CurriculumSchema, cv)
}

export function parseCurriculumList(value: unknown): Array<Curriculum> {
	if (!Array.isArray(value)) {
		return [CurriculumConst()]
	}

	return parseSchemaArray(value, CurriculumSchema)
}

export function parseDefaultConfig(value: unknown): DefaultConfig {
	const cv = DefaultConfigConst()

	if (!isObject(value)) {
		return cv
	}

	if (isObject(value.Settings)) {
		cv.Settings.margin = isNumberOrDefault(value.Settings.margin, 1)
		cv.Settings.gap = isNumberOrDefault(value.Settings.gap, 1.3)

		if (Array.isArray(value.Settings.order)) {
			cv.Settings.order = value.Settings.order.reduce<
				Array<keyof Omit<Curriculum, 'Settings' | 'ProfileId'>>
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
				size: isOneOforDefault(
					value.Header.UserName.size,
					fontSize,
					'--font-size-xl'
				),
				align: isOneOforDefault(value.Header.UserName.align, textAlign, 'start')
			}
			if (isObject(value.Header.Role)) {
				cv.Header.Role = {
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

	if (isObject(value.Contact)) {
		cv.Contact.sideBySide = isBooleanOrDefault(value.Contact.sideBySide, true)
		cv.Contact.size = isOneOforDefault(
			value.Contact.size,
			fontSize,
			'--font-size-sm'
		)
		cv.Contact.align = isOneOforDefault(value.Contact.align, textAlign, 'start')
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
	}

	if (isObject(value.Summary)) {
		cv.Summary.size = isOneOforDefault(
			value.Summary.size,
			fontSize,
			'--font-size-sm'
		)
		cv.Summary.show = isBooleanOrDefault(value.Summary.show, true)
		cv.Summary.smallText = isStringOrDefault(value.Summary.smallText, '')
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

		cv.Experience.dateYear = isOneOforDefault(
			value.Experience.dateMonth,
			yearOptions,
			'numeric'
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

		cv.AcademicBackground.dateYear = isOneOforDefault(
			value.AcademicBackground.dateMonth,
			yearOptions,
			'numeric'
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
	}

	return cv
}
