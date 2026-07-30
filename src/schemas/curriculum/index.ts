import z from 'zod'

import { ContactsArrayCheck } from '../helpers'
import { AcademicBackgroundSchema } from './academic'
import { ContactSchema } from './contact'
import { CoreSkillsSchema } from './coreSkills'
import { ExperienceSchema } from './experience'
import { HeaderSchema } from './header'
import { SettingsSchema } from './settings'
import { SummarySchema } from './summary'

export const CurriculumSchema = z.object({
	Settings: SettingsSchema,
	Header: HeaderSchema,
	Contact: ContactSchema,
	Summary: SummarySchema,
	CoreSkills: CoreSkillsSchema,
	Experience: ExperienceSchema,
	AcademicBackground: AcademicBackgroundSchema
})

export const DefaultConfigSchema = z.object({
	Settings: z.clone(
		CurriculumSchema.shape.Settings.omit({
			language: true
		})
	),
	Header: z.object({
		Role: z.clone(
			CurriculumSchema.shape.Header.shape.Role.omit({
				value: true
			})
		),
		UserName: z.clone(
			CurriculumSchema.shape.Header.shape.UserName.omit({
				value: true
			})
		)
	}),
	Contact: z.clone(
		CurriculumSchema.shape.Contact.omit({
			value: true
		}).extend({
			valueOrder: ContactsArrayCheck
		})
	),
	Summary: z.clone(
		CurriculumSchema.shape.Summary.omit({
			value: true
		})
	),
	CoreSkills: z.clone(
		CurriculumSchema.shape.CoreSkills.omit({
			value: true
		})
	),
	Experience: z.clone(
		CurriculumSchema.shape.Experience.omit({
			value: true
		})
	),
	AcademicBackground: z.clone(
		CurriculumSchema.shape.AcademicBackground.omit({
			value: true
		})
	)
})
