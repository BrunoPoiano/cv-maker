<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'

import { skillList } from '@/constants/skillList'
import { Translate } from '@/constants/translations'
import { ProviderKey } from '@/keys'
import type {
	BoldMatchReturn,
	FontSize,
	Languages,
	SkillsList,
	SkillsOrdered
} from '@/types'

import AppBoldMatch from './appBoldMatch.vue'
import AppInput from './appInput.vue'

type Props = {
	language: Languages
	boldMatches?: (v: string) => BoldMatchReturn
	fontSize?: FontSize
	readonly?: boolean
}

const { curriculum } = inject(ProviderKey)!
const { boldMatches, fontSize, readonly } = defineProps<Props>()
const localSkills = ref<SkillsOrdered>(skillsObj())

function skillsObj() {
	const skills = curriculum.value.CoreSkills.skills
	const result: SkillsOrdered = {}

	for (const item of skillList) {
		const core = item.toLowerCase() as SkillsList
		const value = skills[core]

		if (value?.length) {
			result[core] = value.join(', ')
		}
	}

	return result
}

function saveSkill(core: SkillsList, val: string) {
	localSkills.value[core] = val

	if (val === '') {
		delete curriculum.value.CoreSkills.skills[core]
	} else {
		curriculum.value.CoreSkills.skills[core] = val
			.split(',')
			.map((s) => s.trim())
	}
}


</script>

<template>
	<ul>
		<li v-for="(skill, core) in localSkills" :key="core">
			<div v-if="skill">
				<span :style="{ fontSize: `var(${fontSize})` }" class="core">
					{{ Translate[core][language] }}:
				</span>
				<span v-if="!readonly" :style="{ fontSize: `var(${fontSize})` }">
					<AppInput cv-input :model-value="skill" @update:model-value="(val) => saveSkill(core, val)" />
				</span>
				<span v-else-if="boldMatches && skill" :style="{ fontSize: `var(${fontSize})` }">
					<AppBoldMatch :value="boldMatches(skill)" />
				</span>
			</div>
		</li>
	</ul>
</template>

<style scoped>
ul {
	margin: 0;
	padding-left: 1rem;
	display: grid;
	gap: calc((var(--_a4-gap) * 0.3));

	li {
		text-box-trim: trim-end;
		text-box-edge: cap alphabetic;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight);
		color: var(--light-text-color);

		div {
			display: grid;
			grid-template-columns: auto 1fr;
			gap: 0.5ch;
		}

		.core {
			text-transform: capitalize;
		}
	}
}
</style>
