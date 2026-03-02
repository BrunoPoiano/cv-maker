import type { fontSize } from './constants/font-size'
import type { languages } from './constants/language'
import type { skillList } from './constants/skillList'

export type Languages = (typeof languages)[number]
export type FontSize = (typeof fontSize)[number]
export type SkillsList = Lowercase<(typeof skillList)[number]>
export type Skills = Partial<Record<SkillsList, Array<string>>>
export type SelectItem = Array<{ value: string; label: string }>

type Email = `${string}@${string}`
type Linkedin = `linkedin.com/in/${string}`
type GitHub = `github.com/${string}`

type Contact = {
	size: FontSize
	value: {
		email: Email
		linkedin: Linkedin
		github: GitHub
	}
}

export type Experience = {
	id?:string,
	Role: string
	CompanyName: string
	StartDate: Date
	EndDate: Date | null
	Description: Array<string> | string
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

type Sumarry = {
	value: Array<string> | string
	size: FontSize
}

type CoreSkills = {
	skills: Skills
	size: FontSize
}

export type Curriculum = {
	Header: Header
	Contact: Contact
	Summary: Sumarry
	CoreSkills: CoreSkills
	Experience: {
		size:{
			title: FontSize
			description: FontSize
		}
		value: Array<Experience>
	}
}
