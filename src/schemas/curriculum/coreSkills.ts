import z from 'zod'

import { FontSizeCheck } from '../helpers'

export const CoreSkillsSchema = z.object({
	value: z.record(z.string(), z.array(z.string())),
	sideBySide: z.boolean().default(false),
	size: FontSizeCheck,
	show: z.boolean().default(false)
})

// export type CoreSkills = {
// 	value: Record<string, Array<string>>
// 	sideBySide: boolean
// 	size: FontSize
// 	show: boolean
// }
