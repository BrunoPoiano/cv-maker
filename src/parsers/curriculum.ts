import { CurriculumConst } from '@/constants/curriculum'
import { DefaultConfigConst } from '@/constants/defaultConfig'
import { parseSchemaArray, parseSchemaObj } from '@/helpers/schemaParser'
import { CurriculumSchema, DefaultConfigSchema } from '@/schemas/curriculum'
import type { Curriculum, DefaultConfig } from '@/types'

import { isObject } from './typeValidation'

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

export function parseDefaultConfig(value: unknown): DefaultConfig {
	const cv = DefaultConfigConst()

	if (!isObject(value)) {
		return cv
	}
	return parseSchemaObj(value, DefaultConfigSchema, cv)
}
