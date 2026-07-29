import z from 'zod'

import { CurriculumSchema } from './curriculum'

export const ProfilesSchema = z.object({
	id: z.number(),
	name: z.string().trim(),
	curriculums: z.array(CurriculumSchema)
})
