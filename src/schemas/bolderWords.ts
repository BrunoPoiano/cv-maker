import * as z from 'zod'

export const bolderWordsSchema = z.record(z.number(), z.array(z.string()))
