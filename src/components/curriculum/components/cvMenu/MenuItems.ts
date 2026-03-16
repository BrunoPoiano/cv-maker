import { defineAsyncComponent } from 'vue'

import SvgPen from '@/svgs/SvgPen.vue'
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
		icon: SvgPen,
		label: 'Settings'
	},
	{
		modal: ModalHeader,
		id: 'modalCvHeader',
		icon: SvgPen,
		label: 'Header'
	},
	{
		modal: ModalContact,
		id: 'modalCvContact',
		icon: SvgPen,
		label: 'Contact'
	},
	{
		modal: ModalSummary,
		id: 'modalCvSummary',
		icon: SvgPen,
		label: 'Summary'
	},

	{
		modal: ModalCoreSkills,
		id: 'modalCvCoreSkills',
		icon: SvgPen,
		label: 'Core Skills'
	},
	{
		modal: ModalExperience,
		id: 'modalCvExperience',
		icon: SvgPen,
		label: 'Experience'
	}
]
