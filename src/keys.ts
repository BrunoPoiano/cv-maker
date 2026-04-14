import type { ComputedRef, InjectionKey } from 'vue'

import type { Provider } from './types'

export const ProviderKey: InjectionKey<Provider> = Symbol('provider')
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
