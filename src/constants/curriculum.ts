import type { Curriculum } from '@/types'

export function CurriculumConst(): Curriculum {
	return {
		Settings: {
			language: 'en-us'
		},
		Header: {
			UserName: {
				value: '',
				size: '--font-size-xl'
			},
			Role: {
				value: '',
				size: '--font-size-lg'
			}
		},
		Contact: {
			size: '--font-size-sm',
			value: {
				email: 'email@email',
				linkedin: 'linkedin.com/in/',
				github: 'github.com/'
			}
		},
		Summary: {
			smallText: '',
			value: [],
			size: '--font-size-md',
			show: true
		},
		CoreSkills: {
			show: true,
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
			size: '--font-size-md'
		},
		Experience: {
			dateMonth: '2-digit',
			show: true,
			size: {
				title: '--font-size-lg',
				subTitle: '--font-size-md',
				description: '--font-size-md'
			},
			value: []
		}
	}
}
