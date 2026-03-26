import type { ComputedRef, InjectionKey } from 'vue'

import type { Provider, SkillsList } from './types'

export const ProviderKey: InjectionKey<Provider> = Symbol('provider')
export const ProviderSkillKey: InjectionKey<{
	skillsProxy: ComputedRef<Record<SkillsList, string>>
	onInput(core: SkillsList, value?: string): void
}> = Symbol('provider')

export const localStorageKeys = [
	'curriculumList',
	'curriculumIndex',
	'theme',
	'bolder',
	'readonly'
] as const
