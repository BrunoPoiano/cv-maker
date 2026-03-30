import { defineAsyncComponent } from 'vue'

import type { MenuModalItem } from '@/types'

const GeneratePrompt = defineAsyncComponent(
	() => import('../modals/modalGeneratePrompt.vue')
)
const Bolder = defineAsyncComponent(() => import('../modals/modalBolder.vue'))

export const topMenuItems: MenuModalItem[] = [
	{
		modal: Bolder,
		id: 'modalMenuBolder',
		label: 'Bolder Words'
	},
	{
		modal: GeneratePrompt,
		label: 'Generate Prompt',
		id: 'modalGeneratePrompt'
	}
]
