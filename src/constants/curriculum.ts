import type { Curriculum } from '@/types'

export function CurriculumConst(): Curriculum {
	return {
		language: 'en',
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
			value: [],
			size: '--font-size-md'
		},
		CoreSkills: {
			skills: {
				languages: [],
				apis: [],
				databases: [],
				frontend: [],
				containers_devops: [],
				practices: []
			},
			size: '--font-size-md'
		},
		Experience: {
			size: {
				title: '--font-size-lg',
				description: '--font-size-md'
			},
			value: []
		}
	}
}
