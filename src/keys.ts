import type { ComputedRef, InjectionKey, WritableComputedRef } from 'vue'

import type { Curriculum } from './types'

export const ProviderKey: InjectionKey<{
	curriculum: WritableComputedRef<Curriculum>
}> = Symbol('provider')

export const ProviderSkillKey: InjectionKey<{
	skillsProxy: ComputedRef<Record<string, string>>
	onInput(core: string, value?: string): void
}> = Symbol('provider')

export const localStorageKeys = [
	'curriculumList',
	'curriculumIndex',
	'theme',
	'bolder',
	'readonly',
	'hue'
] as const
