import { defineAsyncComponent } from 'vue'

import type { MenuModalItem } from '@/types'

const ModalExperience = defineAsyncComponent(
	() => import('./modals/experience/modalExperience.vue')
)
const ModalContact = defineAsyncComponent(
	() => import('./modals/modalContact.vue')
)
const ModalCoreSkills = defineAsyncComponent(
	() => import('./modals/modalCoreSkills.vue')
)
const ModalHeader = defineAsyncComponent(
	() => import('./modals/modalHeader.vue')
)
const ModalSummary = defineAsyncComponent(
	() => import('./modals/modalSummary.vue')
)
const ModalSettings = defineAsyncComponent(
	() => import('./modals/modalSettings.vue')
)

export const menuItems: MenuModalItem[] = [
	{
		modal: ModalSettings,
		id: 'modalCvSettings',
		backgroundColor: 'var(--surface-container-low)',
		label: 'Settings'
	},
	{
		modal: ModalHeader,
		id: 'modalCvHeader',
		backgroundColor: 'var(--surface-container-low)',
		label: 'Header'
	},
	{
		modal: ModalContact,
		id: 'modalCvContact',
		backgroundColor: 'var(--surface-container-low)',
		label: 'Contact'
	},
	{
		modal: ModalSummary,
		id: 'modalCvSummary',
		backgroundColor: 'var(--surface-container-low)',
		label: 'Summary'
	},

	{
		modal: ModalCoreSkills,
		id: 'modalCvCoreSkills',
		backgroundColor: 'var(--surface-container-low)',
		label: 'Core Skills'
	},
	{
		modal: ModalExperience,
		id: 'modalCvExperience',
		backgroundColor: 'var(--surface-container-low)',
		label: 'Experience'
	}
]
