import type { Temporal } from '@js-temporal/polyfill'
import type { Component, RendererElement, RendererNode, VNode } from 'vue'

import type { localStorageKeys } from '@/keys'

import type { fontSize } from './constants/font-size'
import type { languages } from './constants/language'
import type { dateStyle } from './constants/dateOptions'
import type { textAlign } from './constants/text-align'

export type LocalStorageKeys = (typeof localStorageKeys)[number]
export type Languages = (typeof languages)[number]
export type FontSize = (typeof fontSize)[number]
export type TextAlign = (typeof textAlign)[number]
export type DateStyle = (typeof dateStyle)[number]
export type SelectItem = Array<{ value: string | number; label: string }>
export type Translation = Record<string, Each<Languages>>
export type MonthOptions = Extract<
	Intl.DateTimeFormatOptions['month'],
	'2-digit' | 'short' | 'long'
>
export type YearOptions = Extract<
	Intl.DateTimeFormatOptions['year'],
	'numeric' | '2-digit'
>

type Each<T extends string> = {
	[K in T]: string
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
	align: TextAlign
	value: {
		email: {
			value: string
			bolder: boolean
		}
		linkedin: {
			value: string
			bolder: boolean
		}
		github: {
			value: string
			bolder: boolean
		}
		location: {
			value: string
			bolder: boolean
		}
		website: {
			value: string
			bolder: boolean
		}
		telephone: {
			value: string
			bolder: boolean
		}
	}
}

export type Course = {
	id: string
	Course: string
	Diploma: string
	Institution: string
	StartDate: Temporal.PlainDate | null
	EndDate: Temporal.PlainDate | null
}

type Header = {
	UserName: {
		value: string
		size: FontSize
		align: TextAlign
	}
	Role: {
		value: string
		size: FontSize
		align: TextAlign
	}
}

type Summary = {
	smallText: string
	value: Array<string> | string
	size: FontSize
	show: boolean
}

export type CoreSkills = {
	value: Record<string, Array<string>>
	sideBySide: boolean
	size: FontSize
	show: boolean
}

type Settings = {
	language: Languages
	order: Array<keyof Omit<Curriculum, 'Settings'>>
	margin: number
	gap: number
	section: {
		size: FontSize
	}
}

export type Experience = {
	show: boolean
	dateStyle: DateStyle
	dateMonth: MonthOptions
	dateYear: YearOptions
	sideBySide: boolean
	size: {
		title: FontSize
		subTitle: FontSize
		description: FontSize
	}
	value: Array<{
		id: string
		Role: string
		CompanyName: string
		StartDate: Temporal.PlainDate | null
		EndDate: Temporal.PlainDate | null
		Description: Array<string> | string
		Remote: boolean
	}>
}

type AcademicBackground = {
	show: boolean
	dateMonth: MonthOptions
	dateStyle: DateStyle
	dateYear: YearOptions
	size: FontSize
	value: Array<Course>
}

export type Curriculum = {
	Settings: Settings
	Header: Header
	Contact: Contact
	Summary: Summary
	CoreSkills: CoreSkills
	Experience: Experience
	AcademicBackground: AcademicBackground
}

export type DefaultConfig = {
	[T in keyof Curriculum]: RemoveValue<
		T extends 'Settings' ? Omit<Curriculum[T], 'language'> : Curriculum[T]
	>
}

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

type RemoveValue<T> = T extends readonly unknown[]
	? T
	: T extends { value: Array<unknown> }
	? Omit<T, 'value'>
	: T extends { value: object }
	? T['value'] extends Record<string, unknown>
	? Omit<T, 'value'>
	: Omit<T, 'value'> & { value: RemoveValue<T['value']> }
	: T extends object
	? {
		[K in keyof T as K extends 'value' ? never : K]: RemoveValue<T[K]>
	}
	: T
