import { createApp, type InjectionKey } from 'vue'
import App from './App.vue'
import type { Curriculum } from './types'
export const CurriculumKey: InjectionKey<Curriculum> = Symbol('curriculum')

createApp(App).mount('#app')
