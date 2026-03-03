import {
	createApp,
	type InjectionKey,
	type Ref,
	type WritableComputedRef
} from 'vue'
import App from './App.vue'
import type { Curriculum, Languages } from './types'

type Provider = {
	curriculum: WritableComputedRef<Curriculum>
	bolder: string[]
	language: Ref<Languages>
}

export const ProviderKey: InjectionKey<Provider> = Symbol('provider')

createApp(App).mount('#app')
