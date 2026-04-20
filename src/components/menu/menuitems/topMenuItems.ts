import { defineAsyncComponent } from 'vue'

import type { MenuModalItem } from '@/types'

import ModalAddCurriculum from '../modals/modalAddCurriculum.vue'

const GeneratePrompt = defineAsyncComponent(
	() => import('../modals/modalGeneratePrompt.vue')
)
const Bolder = defineAsyncComponent(() => import('../modals/modalBolder.vue'))
const ModalBackup = defineAsyncComponent(
	() => import('../modals/modalBackup.vue')
)
export const topMenuItems: MenuModalItem[] = [
	{
		modal: ModalBackup,
		label: 'Import/Export',
		id: 'modalMenuImportExport'
	},
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
		modal: ModalAddCurriculum,
		label: 'Add JSON Curriculum',
		id: 'modalMenuNewCurriculum'
	}
]
