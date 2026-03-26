<script setup lang="ts">
import { computed, inject, provide } from 'vue'

import { skillList } from '@/constants/skillList'
import { ProviderKey, ProviderSkillKey } from '@/keys'
import type { SkillsList } from '@/types'

import CvMenuIndex from './components/cvMenu/cvMenuIndex.vue'
import CvPageIndex from './components/cvPage/cvPageIndex.vue'

const { curriculum } = inject(ProviderKey)!

const skillsProxy = computed(() => {
	const source = curriculum.value.CoreSkills.skills
	const result: Record<SkillsList, string> = {
		other: '',
		languages: '',
		frontend: '',
		backend: '',
		databases: '',
		apis: '',
		containers_devops: '',
		practices: '',
		http_integrations: ''
	}

	for (const item of skillList) {
		const key = item.toLowerCase() as SkillsList
		result[key] = source[key]?.join(', ') ?? ''
	}

	return result
})

function onInput(core: SkillsList, value?: string) {
	curriculum.value.CoreSkills.skills[core] = value
		? value
				.split(',')
				.map((item) => item.trim())
				.filter((item) => item !== '')
		: []
}

provide(ProviderSkillKey, {
	skillsProxy,
	onInput
})
</script>

<template>
	<CvMenuIndex />
	<CvPageIndex />
</template>
