import * as z from 'zod'

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
