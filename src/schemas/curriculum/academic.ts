import { z } from 'zod'

import {
	DateStyleCheck,
	FontSizeCheck,
	MonthOptionsCheck,
	NullableTemporalDateCheck,
	YearOptionsCheck
} from '../helpers'

export const CourseSchema = z.object({
	id: z.string().trim(),
	Course: z.string().trim(),
	Diploma: z.string().trim(),
	Institution: z.string().trim(),
	StartDate: NullableTemporalDateCheck,
	EndDate: NullableTemporalDateCheck
})

export const AcademicBackgroundSchema = z.object({
	show: z.boolean().default(false),
	dateMonth: MonthOptionsCheck,
	dateStyle: DateStyleCheck,
	dateYear: YearOptionsCheck,
	size: FontSizeCheck,
	value: z.array(CourseSchema)
})

export type AcademicBackground = z.infer<typeof AcademicBackgroundSchema>

// export type Course = {
// 	id: string
// 	Course: string
// 	Diploma: string
// 	Institution: string
// 	StartDate: Temporal.PlainDate | null
// 	EndDate: Temporal.PlainDate | null
// }

// type AcademicBackground = {
// 	show: boolean
// 	dateMonth: MonthOptions
// 	dateStyle: DateStyle
// 	dateYear: YearOptions
// 	size: FontSize
// 	value: Array<Course>
// }
