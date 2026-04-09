import { defineAsyncComponent } from 'vue'

import type { MenuModalItem } from '@/types'

const GeneratePrompt = defineAsyncComponent(
	() => import('../modals/modalGeneratePrompt.vue')
)
const Bolder = defineAsyncComponent(() => import('../modals/modalBolder.vue'))
const ModalBackup = defineAsyncComponent(
	() => import('../modals/modalBackup.vue')
)
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
	},
	{
		modal: ModalBackup,
		label: 'Import/Export',
		id: 'modalMenuImportExport'
	}
]
