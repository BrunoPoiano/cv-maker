import { CurriculumConst } from '@/constants/curriculum'
import { parseSchemaArray, parseSchemaObj } from '@/helpers/schemaParser'
import { CurriculumSchema } from '@/schemas/curriculum'
import type { Curriculum } from '@/types'

export function parseCurriculum(value: unknown): Curriculum {
	const cv = CurriculumConst()
	return parseSchemaObj(value, CurriculumSchema, cv)
}

export function parseCurriculumList(value: unknown): Array<Curriculum> {
	if (!Array.isArray(value)) {
		return [CurriculumConst()]
	}

	return parseSchemaArray(value, CurriculumSchema)
}
