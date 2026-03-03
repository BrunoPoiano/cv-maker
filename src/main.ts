import { createApp, type InjectionKey, type WritableComputedRef } from 'vue'
import App from './App.vue'
import type { Curriculum } from './types'

type Provider = {
	curriculum: WritableComputedRef<Curriculum>
	bolder: string[]
}

export const ProviderKey: InjectionKey<Provider> = Symbol('provider')

createApp(App).mount('#app')
