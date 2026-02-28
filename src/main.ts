import { createApp, type InjectionKey } from 'vue'
import App from './App.vue'
import type { Curriculum } from './types'

export const CurriculumKey: InjectionKey<Curriculum> = Symbol('curriculum')
export const BolderKey: InjectionKey<string[]> = Symbol('bolder')

createApp(App).mount('#app')
