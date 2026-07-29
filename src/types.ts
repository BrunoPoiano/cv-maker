import type { Component, RendererElement, RendererNode, VNode } from 'vue'
import type z from 'zod'

import type { localStorageKeys } from '@/keys'

import type { contacts } from './constants/contact'
import type { curriculumOrderArray } from './constants/curriculumOrder'
import type { dateStyle } from './constants/dateOptions'
import type { fontSize } from './constants/font-size'
import type { languages } from './constants/language'
import type { textAlign } from './constants/text-align'
import type { bolderWordsSchema } from './schemas/bolderWords'
import type {
	CurriculumSchema,
	DefaultConfigSchema
} from './schemas/curriculum'
import type { CourseSchema } from './schemas/curriculum/academic'
import type { ContactSchema } from './schemas/curriculum/contact'
import type { CoreSkillsSchema } from './schemas/curriculum/coreSkills'
import type { ExperienceSchema } from './schemas/curriculum/experience'
import type { curriculumIndexSchema } from './schemas/curriculumIndex'
import type { profileDefaultConfigSchema } from './schemas/profileDefaultConfig'
import type { ProfilesSchema } from './schemas/profiles'
import type { ProfilesStore } from './stores/profileStore'

export type LocalStorageKeys = (typeof localStorageKeys)[number]
export type Languages = (typeof languages)[number]
export type FontSize = (typeof fontSize)[number]
export type TextAlign = (typeof textAlign)[number]
export type DateStyle = (typeof dateStyle)[number]
export type SelectItem = Array<{ value: string | number; label: string }>
export type Translation = Record<string, Each<Languages>>
export type ContactValues = (typeof contacts)[number]

export type MonthOptions = Extract<
	Intl.DateTimeFormatOptions['month'],
	'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
>
export type YearOptions = Extract<
	Intl.DateTimeFormatOptions['year'],
	'numeric' | '2-digit'
>

export type BaseItem<T extends string> = {
	[K in T]: {
		label: string
	}
}

type Each<T extends string> = {
	[K in T]: string
}

export type TableProps = Array<
	Record<string, unknown> & {
		actions: {
			component: Component
			props: Record<string, unknown>
		}
	}
>

export type BolderWords = z.infer<typeof bolderWordsSchema>
export type CurriculumIndex = z.infer<typeof curriculumIndexSchema>
export type ProfileDefaultConfig = z.infer<typeof profileDefaultConfigSchema>
export type Profile = z.infer<typeof ProfilesSchema>

export type BoldMatchReturn =
	| string
	| (
			| string
			| VNode<
					RendererNode,
					RendererElement,
					{
						[key: string]: unknown
					}
			  >
	  )[]

export type Contact = z.infer<typeof ContactSchema>
export type Course = z.infer<typeof CourseSchema>
export type CoreSkills = z.infer<typeof CoreSkillsSchema>
export type Experience = z.infer<typeof ExperienceSchema>
export type Order = Array<(typeof curriculumOrderArray)[number]>
export type Curriculum = z.infer<typeof CurriculumSchema>

export type DefaultConfig = z.infer<typeof DefaultConfigSchema>

export type HasShow = keyof Pick<
	Curriculum,
	{
		[K in keyof Curriculum]: Curriculum[K] extends { show: boolean } ? K : never
	}[keyof Curriculum]
>

export type CurriculumOrder = Record<
	keyof Omit<Curriculum, 'Settings'>,
	Component
>

export type MenuModalItem = {
	modal: Component
	id: string
	icon?: Component
	label: string
	backgroundColor?: string
}

type ProfileStore = keyof typeof ProfilesStore

export type MenuButtonList = {
	click: {
		[T in ProfileStore]: (typeof ProfilesStore)[T]
	}[ProfileStore]
	id: string
	hoverBackground: string
	title: string
	disabled?: boolean
	svg: Component
}
