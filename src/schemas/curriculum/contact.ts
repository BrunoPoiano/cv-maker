import z from 'zod'

import { ContactsCheck, FontSizeCheck, TextAlignCheck } from '../helpers'

export const ContactSchema = z.object({
	size: FontSizeCheck,
	sideBySide: z.boolean().default(false),
	align: TextAlignCheck,
	value: z.record(
		ContactsCheck,
		z.object({
			value: z.string().trim(),
			bolder: z.boolean().default(false)
		})
	)
})

// export type Contact = {
// 	size: FontSize
// 	sideBySide: boolean
// 	align: TextAlign
// 	value: Record<
// 		ContactValues,
// 		{
// 			value: string
// 			bolder: boolean
// 		}
// 	>
// }
