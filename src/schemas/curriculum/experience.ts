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

export type Experience = z.infer<typeof ExperienceSchema>

// export type Experience = {
// 	show: boolean
// 	dateStyle: DateStyle
// 	dateMonth: MonthOptions
// 	dateYear: YearOptions
// 	sideBySide: boolean
// 	size: {
// 		title: FontSize
// 		subTitle: FontSize
// 		description: FontSize
// 	}
// 	value: Array<{
// 		id: string
// 		Role: string
// 		CompanyName: string
// 		StartDate: Temporal.PlainDate | null
// 		EndDate: Temporal.PlainDate | null
// 		Description: Array<string> | string
// 		Remote: boolean
// 	}>
// }
