import type { DefaultConfig } from '@/types'

export function DefaultConfigConst(): DefaultConfig {
	return {
		Settings: {
			gap: 1.3,
			section: {
				size: '--font-size-base'
			},
			margin: 0.8,
			order: [
				'Header',
				'Contact',
				'Summary',
				'CoreSkills',
				'AcademicBackground',
				'Experience'
			]
		},
		Header: {
			UserName: {
				size: '--font-size-lg',
				align: 'start'
			},
			Role: {
				size: '--font-size-md',
				align: 'start'
			}
		},
		Contact: {
			size: '--font-size-sm',
			sideBySide: false,
			align: 'start'
		},
		Summary: {
			smallText: '',
			size: '--font-size-sm',
			show: true
		},
		CoreSkills: {
			show: true,
			sideBySide: false,
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
			}
		},
		AcademicBackground: {
			dateMonth: '2-digit',
			dateStyle: 'date',
			show: true,
			size: '--font-size-base'
		}
	}
}
