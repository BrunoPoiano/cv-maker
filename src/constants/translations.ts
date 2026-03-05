import type { Translation } from '@/types'

export const Translate = {
	present: {
		'en-us': 'Present',
		'pt-br': 'Atual'
	},
	'professional experience': {
		'en-us': 'PROFESSIONAL EXPERIENCE',
		'pt-br': 'EXPERIÊNCIA PROFISSIONAL'
	},
	summary: {
		'en-us': 'SUMMARY',
		'pt-br': 'RESUMO'
	},
	'core skills': {
		'en-us': 'CORE SKILLS',
		'pt-br': 'HABILIDADES TÉCNICAS'
	},
	remote: {
		'en-us': 'Remote',
		'pt-br': 'Remoto'
	},
	languages: {
		'en-us': 'Languages',
		'pt-br': 'Linguagens'
	},
	apis: {
		'en-us': 'APIs',
		'pt-br': 'APIs'
	},
	databases: {
		'en-us': 'Databases',
		'pt-br': 'Bancos de Dados'
	},
	frontend: {
		'en-us': 'Frontend',
		'pt-br': 'Frontend'
	},
	containers_devops: {
		'en-us': 'Containers & DevOps',
		'pt-br': 'Containers & DevOps'
	},
	practices: {
		'en-us': 'Practices',
		'pt-br': 'Práticas'
	},
	backend: {
		'en-us': 'Backend',
		'pt-br': 'Backend'
	},
	http_integrations: {
		'en-us': 'HTTP Integrations',
		'pt-br': 'Integrações HTTP'
	},
	other: {
		'en-us': 'Other',
		'pt-br': 'Outros'
	}
} as const satisfies Translation
