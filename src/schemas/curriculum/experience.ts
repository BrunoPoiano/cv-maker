import z from 'zod'

import {
	DateStyleCheck,
	FontSizeCheck,
	MonthOptionsCheck,
	NullableTemporalDateCheck,
	YearOptionsCheck
} from '../helpers'

const size = z.object({
	title: FontSizeCheck,
	subTitle: FontSizeCheck,
	description: FontSizeCheck
})

const value = z.object({
	id: z.string().trim(),
	Role: z.string().trim(),
	CompanyName: z.string().trim(),
	StartDate: NullableTemporalDateCheck,
	EndDate: NullableTemporalDateCheck,
	Description: z.union([z.string(), z.array(z.string())]),
	Remote: z.boolean().default(false)
})

export const ExperienceSchema = z.object({
	show: z.boolean().default(false),
	dateStyle: DateStyleCheck,
	dateMonth: MonthOptionsCheck,
	dateYear: YearOptionsCheck,
	sideBySide: z.boolean().default(false),
	size,
	value: z.array(value)
})
