import { CurriculumConst } from '@/constants/curriculum'
import { fontSize } from '@/constants/font-size'
import { languages } from '@/constants/language'
import type { Curriculum, Experience } from '@/types'
import {
	isBooleanOrDefault,
	isExtendedStringOrDefault,
	isObject,
	isOneOforDefault,
	isStringOrDefault
} from './typeValidation'
import { monthOptions } from '@/constants/monthOptions'
import { generateKey } from '@/helpers/generateKey'
import { marginList } from '@/constants/margin'

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

		cv.Settings.margin = isOneOforDefault(value.Settings.margin, marginList, 1)

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
		cv.Contact = {
			size: isOneOforDefault(value.Contact.size, fontSize, '--font-size-sm'),
			sideBySide: isBooleanOrDefault(value.Contact.sideBySide, false),
			value: {
				email: isExtendedStringOrDefault(
					value.Contact.value.email,
					'email@email'
				),
				linkedin: isExtendedStringOrDefault(
					value.Contact.value.linkedin,
					'linkedin.com/in/'
				),
				github: isExtendedStringOrDefault(
					value.Contact.value.github,
					'github.com/'
				)
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

			if (Array.isArray(value.CoreSkills.skills.backend)) {
				cv.CoreSkills.skills.backend = value.CoreSkills.skills.backend.reduce(
					(acc, item) => {
						acc.push(isStringOrDefault(item, undefined))
						return acc
					},
					[]
				)
			}

			if (Array.isArray(value.CoreSkills.skills.other)) {
				cv.CoreSkills.skills.other = value.CoreSkills.skills.other.reduce(
					(acc, item) => {
						acc.push(isStringOrDefault(item, undefined))
						return acc
					},
					[]
				)
			}

			if (Array.isArray(value.CoreSkills.skills.http_integrations)) {
				cv.CoreSkills.skills.http_integrations =
					value.CoreSkills.skills.http_integrations.reduce((acc, item) => {
						acc.push(isStringOrDefault(item, undefined))
						return acc
					}, [])
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

	const cvList = value.reduce<Array<Curriculum>>((acc, item) => {
		acc.push(parseCurriculum(item))
		return acc
	}, [])

	return cvList.sort((item) => (item.Settings.language === 'en-us' ? 0 : 1))
}
