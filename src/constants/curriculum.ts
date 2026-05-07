import type { Curriculum } from '@/types'

export function CurriculumConst(): Curriculum {
	return {
		Settings: {
			language: 'en-us',
			margin: 0.8,
			gap: 1.3,
			section: {
				size: '--font-size-md'
			}
		},
		Header: {
			UserName: {
				value: 'Full Name',
				size: '--font-size-xl',
				align: 'start'
			},
			Role: {
				value: 'Role',
				size: '--font-size-lg',
				align: 'start'
			}
		},
		Contact: {
			size: '--font-size-sm',
			sideBySide: false,
			align: 'start',
			value: {
				location: {
					bolder: false,
					value: ''
				},
				email: {
					bolder: true,
					value: 'email@email'
				},
				linkedin: {
					bolder: false,
					value: 'linkedin.com/in/'
				},
				github: {
					bolder: false,
					value: 'github.com/'
				}
			}
		},
		Summary: {
			smallText: '',
			value: [],
			size: '--font-size-sm',
			show: true
		},
		CoreSkills: {
			show: true,
			sideBySide: false,
			skills: {
				languages: [],
				apis: [],
				databases: [],
				frontend: [],
				containers_devops: [],
				practices: [],
				backend: [],
				http_integrations: [],
				other: []
			},
			size: '--font-size-sm'
		},
		Experience: {
			dateMonth: '2-digit',
			show: true,
			sideBySide: false,
			size: {
				title: '--font-size-base',
				subTitle: '--font-size-sm',
				description: '--font-size-sm'
			},
			value: []
		},
		AcademicBackground: {
			dateMonth: '2-digit',
			show: true,
			size: '--font-size-base',
			value: []
		}
	}
}
