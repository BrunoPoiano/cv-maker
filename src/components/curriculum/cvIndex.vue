<script setup lang="ts">
import { computed, inject, provide } from 'vue'

import { skillList } from '@/constants/skillList'
import { ProviderKey, ProviderSkillKey } from '@/keys'
import type { SkillsList } from '@/types'

import CvMenuIndex from './components/cvMenu/cvMenuIndex.vue'
import CvPageIndex from './components/cvPage/cvPageIndex.vue'

const { curriculum } = inject(ProviderKey)!

const skillsProxy = computed({
	get() {
		const source = curriculum.value.CoreSkills.skills
		const result: Record<string, string> = {}

		for (const item of skillList) {
			const key = item.toLowerCase() as SkillsList
			result[key] = source[key]?.join(', ') ?? ''
		}

		return result
	},
	set(value) {
		console.log('aqiu')
		const target = curriculum.value.CoreSkills.skills

		for (const key in value) {
			const v = value[key]

			if (!v) {
				delete target[key as SkillsList]
				continue
			}

			target[key as SkillsList] = v
				.split(',')
				.map((s) => s.trim())
				.filter(Boolean)
		}
	}
})

provide(ProviderSkillKey, {
	skillsProxy
})
</script>

<template>
	<CvMenuIndex />
	<CvPageIndex />
</template>
