import type {
	Component,
	Ref,
	RendererElement,
	RendererNode,
	VNode,
	WritableComputedRef
} from 'vue'

import type { localStorageKeys } from '@/keys'

import type { fontSize } from './constants/font-size'
import type { languages } from './constants/language'
import type { skillList } from './constants/skillList'

export type LocalStorageKeys = (typeof localStorageKeys)[number]
export type Languages = (typeof languages)[number]
export type FontSize = (typeof fontSize)[number]
export type SkillsList = Lowercase<(typeof skillList)[number]>
export type Skills = Partial<Record<SkillsList, Array<string>>>
export type SkillsOrdered = Partial<Record<SkillsList, string>>
export type SelectItem = Array<{ value: string | number; label: string }>
export type Translation = Record<string | SkillsList, Each<Languages>>
export type MonthOptions = Extract<
	Intl.DateTimeFormatOptions['month'],
	'2-digit' | 'short' | 'long'
>

type Each<T extends string> = {
	[K in T]: string
}

type Email = `${string}@${string}`
type Linkedin = `linkedin.com/in/${string}`
type GitHub = `github.com/${string}`

export type Provider = {
	curriculum: WritableComputedRef<Curriculum>
	readonly: Ref<boolean, boolean>
}

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

type Contact = {
	size: FontSize
	sideBySide: boolean
	value: {
		email: {
			value: Email
			bolder: boolean
		}
		linkedin: {
			value: Linkedin
			bolder: boolean
		}
		github: {
			value: GitHub
			bolder: boolean
		}
	}
}

export type Experience = {
	id: string
	Role: string
	CompanyName: string
	StartDate: Date
	EndDate: Date | null
	Description: Array<string> | string
	Remote: boolean
}

type Header = {
	UserName: {
		value: string
		size: FontSize
	}
	Role: {
		value: string
		size: FontSize
	}
}

type Summary = {
	smallText: string
	value: Array<string> | string
	size: FontSize
	show: boolean
}

type CoreSkills = {
	skills: Skills
	size: FontSize
	show: boolean
}
type Settings = {
	language: Languages
	margin: number
	gap: number
	section: {
		size: FontSize
	}
}

export type Curriculum = {
	Settings: Settings
	Header: Header
	Contact: Contact
	Summary: Summary
	CoreSkills: CoreSkills
	Experience: {
		show: boolean
		dateMonth: MonthOptions
		sideBySide: boolean
		size: {
			title: FontSize
			subTitle: FontSize
			description: FontSize
		}
		value: Array<Experience>
	}
}

export type MenuModalItem = {
	modal: Component
	id: string
	icon?: Component
	label: string
	backgroundColor?: string
}
