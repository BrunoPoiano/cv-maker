export const skillList = [
	'Languages',
	'Frontend',
	'Backend',
	'Databases',
	'APIs',
	'Containers_DevOps',
	'Practices',
	'HTTP_Integrations'
] as const

export type Skills = Lowercase<(typeof skillList)[number]>

type Email = `${string}@${string}`
type Linkedin = `linkedin.com/in/${string}`
type GitHub = `github.com/${string}`

type Contact = {
	email: Email
	linkedin: Linkedin
	github: GitHub
}

export type CoreSkills = Partial<Record<Skills, Array<String>>>

type Experience = {
	Label: string
	CompanyName: string
	StartDate: Date
	EndDate: Date | null
	Description: Array<string> | string
}

export type Curriculum = {
	Header: {
		UserName: string
		Label: string
	}
	Contact: Contact
	Summary: Array<string> | string
	CoreSkills: CoreSkills
	Experience: Array<Experience>
}
