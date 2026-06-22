import { defaultConfigStore } from '@/stores/defaultConfig'
import type { Curriculum } from '@/types'

export function CurriculumConst(): Curriculum {
	const defaultConfig = defaultConfigStore.get()

	return {
		ProfileId: 1,
		Settings: {
			language: 'en-us',
			order: [
				'Header',
				'Contact',
				'Summary',
				'CoreSkills',
				'AcademicBackground',
				'Experience'
			],
			margin: 0.8,
			gap: 1.3,
			section: {
				size: '--font-size-md'
			}
		},
		Header: {
			UserName: {
				...defaultConfig.value.Header.UserName,
				value: 'Full Name'
			},
			Role: {
				...defaultConfig.value.Header.Role,
				value: 'Role'
			}
		},
		Contact: {
			...defaultConfig.value.Contact,
			value: {
				location: {
					bolder: true,
					value: ''
				},
				email: {
					bolder: true,
					value: 'email@email'
				},
				telephone: {
					bolder: false,
					value: ''
				},
				linkedin: {
					bolder: false,
					value: 'linkedin.com/in/'
				},
				website: {
					bolder: false,
					value: ''
				},
				github: {
					bolder: false,
					value: 'github.com/'
				}
			}
		},
		Summary: {
			...defaultConfig.value.Summary,
			value: []
		},
		CoreSkills: {
			...defaultConfig.value.CoreSkills,
			value: {
				languages: [],
				apis: [],
				databases: [],
				frontend: [],
				containers_devops: [],
				practices: [],
				backend: [],
				http_integrations: [],
				other: []
			}
		},
		Experience: {
			...defaultConfig.value.Experience,
			value: []
		},
		AcademicBackground: {
			...defaultConfig.value.AcademicBackground,
			value: []
		}
	}
}
