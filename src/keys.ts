import type { InjectionKey } from 'vue'
import type { Provider } from './types'

export const ProviderKey: InjectionKey<Provider> = Symbol('provider')

export const localStorageKeys = ["curriculumList",  "curriculumIndex", "theme", "bolder"] as const
