import z from 'zod'

import { ContactsEnumCheck, FontSizeCheck, TextAlignCheck } from '../helpers'

export const ContactSchema = z.object({
	size: FontSizeCheck,
	sideBySide: z.boolean().default(false),
	align: TextAlignCheck,
	value: z.record(
		ContactsEnumCheck,
		z.object({
			value: z.string().trim(),
			bolder: z.boolean().default(false)
		})
	)
})
