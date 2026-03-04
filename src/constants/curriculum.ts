import type { Curriculum } from '@/types'

export function CurriculumConst(): Curriculum {
	return {
		Settings: {
			language: 'en'
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
				practices: []
			},
			size: '--font-size-md'
		},
		Experience: {
			show: true,
			size: {
				title: '--font-size-lg',
				description: '--font-size-md'
			},
			value: []
		}
	}
}
