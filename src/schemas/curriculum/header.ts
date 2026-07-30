import * as z from 'zod'

import { FontSizeCheck, TextAlignCheck } from '../helpers'

const base = z.object({
	value: z.string().trim(),
	align: TextAlignCheck,
	size: FontSizeCheck
})

export const HeaderSchema = z.object({
	UserName: base,
	Role: base
})
