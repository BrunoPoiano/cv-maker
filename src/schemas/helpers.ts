import { Temporal } from '@js-temporal/polyfill'
import * as z from 'zod'

import { contacts } from '@/constants/contact'
import { curriculumOrderArray } from '@/constants/curriculumOrder'
import { dateStyle, monthOptions, yearOptions } from '@/constants/dateOptions'
import { fontSize } from '@/constants/font-size'
import { languages } from '@/constants/language'
import { textAlign } from '@/constants/text-align'
import { isValidDateOrNull } from '@/parsers/temporalValidation'
import type { Order } from '@/types'

export const LanguageCheck = z.enum(languages).catch('en-us')
export const FontSizeCheck = z.enum(fontSize).catch('--font-size-base')
export const TextAlignCheck = z.enum(textAlign).catch('start')
export const MonthOptionsCheck = z.enum(monthOptions).catch('numeric')
export const DateStyleCheck = z.enum(dateStyle).catch('date')
export const YearOptionsCheck = z.enum(yearOptions).catch('2-digit')
export const ContactsEnumCheck = z.enum(contacts).catch('email')

export const OrderCheck = z.custom<Order>((value) => {
	if (Array.isArray(value)) {
		return value.reduce<Array<Order>>((acc, item) => {
			if (curriculumOrderArray.includes(item)) {
				acc.push(item)
			}
			return acc
		}, [])
	}

	return []
})

type Contacts = (typeof contacts)[number]
export const ContactsArrayCheck = z.custom<Array<Contacts>>((value) => {
	if (Array.isArray(value)) {
		return value.reduce<Array<Contacts>>((acc, item) => {
			if (contacts.includes(item)) {
				acc.push(item)
			}
			return acc
		}, [])
	}

	return []
})

const TemporalDateSchema = z.custom<Temporal.PlainDate>(
	(value): value is Temporal.PlainDate => value instanceof Temporal.PlainDate
)
export const NullableTemporalDateCheck = z.preprocess(
	isValidDateOrNull,
	TemporalDateSchema.nullable()
)

export const BooleanCheck = z.preprocess((value) => {
	if (value === 1 || value === '1' || value === 'true') return true
	if (value === 0 || value === '0' || value === 'false') return false

	return value
}, z.boolean())

export const NumberCheck = z.coerce.number().default(0)
