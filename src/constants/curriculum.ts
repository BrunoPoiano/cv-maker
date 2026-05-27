import type { Curriculum } from '@/types'

export function CurriculumConst(): Curriculum {
	return {
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
			smallText: '',
			value: [],
			size: '--font-size-sm',
			show: true
		},
		CoreSkills: {
			show: true,
			sideBySide: false,
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
			},
			size: '--font-size-sm'
		},
		Experience: {
			dateMonth: '2-digit',
			dateStyle: 'date',
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
			dateStyle: 'date',
			show: true,
			size: '--font-size-base',
			value: []
		}
	}
}
