import { createApp, type InjectionKey, type Ref } from 'vue'
import App from './App.vue'
import type { Curriculum, Languages } from './types'


type Provider = {
    curriculum: Curriculum
    bolder: string[]
    language: Ref<Languages>
}

export const ProviderKey: InjectionKey<Provider> = Symbol('provider')

createApp(App).mount('#app')
