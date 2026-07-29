import z from 'zod'

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
