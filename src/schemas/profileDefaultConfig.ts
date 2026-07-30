import z from 'zod'

import { DefaultConfigSchema } from './curriculum'

export const profileDefaultConfigSchema = z.record(
	z.number(),
	z.clone(DefaultConfigSchema)
)
