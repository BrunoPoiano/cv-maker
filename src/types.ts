const skillList = [
  'Languages',
  'APIs',
  'Databases',
  'Frontend',
  'Containers_DevOps',
  'Practices',
] as const

type Skills = (typeof skillList)[number]

type Email = `${string}@${string}`
type Linkedin = `linkedin.com/in/${string}`
type GitHub = `github.com/${string}`

type Contact = {
  email: Email
  linkedin: Linkedin
  github: GitHub
}

export type CoreSkills = Record<Lowercase<Skills>, Array<String>>

type Experience = {
  Label: string
  CompanyName: string
  StartDate: Date
  EndDate: Date | null
  Description: Array<string>
}

export type Curriculum = {
  Header: {
    UserName: string
    Label: string
  }
  Contact: Contact
  Summary: Array<string>
  CoreSkills: CoreSkills
  Experience: Array<Experience>
}
