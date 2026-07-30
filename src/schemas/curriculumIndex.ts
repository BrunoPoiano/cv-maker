import * as z from 'zod'

export const curriculumIndexSchema = z.record(z.number(), z.number())
