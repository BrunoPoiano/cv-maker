import z from 'zod'

import { FontSizeCheck } from '../helpers'

export const SummarySchema = z.object({
	smallText: z.string().trim(),
	value: z.union([z.string(), z.array(z.string())]),
	size: FontSizeCheck,
	show: z.boolean().default(false)
})

// type Summary = {
// 	smallText: string
// 	value: Array<string> | string
// 	size: FontSize
// 	show: boolean
// }
