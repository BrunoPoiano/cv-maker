import z from 'zod'

import { FontSizeCheck, LanguageCheck, OrderCheck } from '../helpers'

export const SettingsSchema = z.object({
	language: LanguageCheck,
	order: OrderCheck,
	margin: z.number(),
	gap: z.number(),
	section: z.object({
		size: FontSizeCheck
	})
})

export type Settings = z.infer<typeof SettingsSchema>

// type Settings = {
// 	language: Languages
// 	order: Order
// 	margin: number
// 	gap: number
// 	section: {
// 		size: FontSize
// 	}
// }
