import type { InjectionKey, WritableComputedRef } from 'vue'

import type { Provider, SkillsList } from './types'

export const ProviderKey: InjectionKey<Provider> = Symbol('provider')
export const ProviderSkillKey: InjectionKey<{
	skillsProxy: WritableComputedRef<Record<SkillsList, string>>
}> = Symbol('provider')

export const localStorageKeys = [
	'curriculumList',
	'curriculumIndex',
	'theme',
	'bolder',
	'readonly'
] as const
