<script setup lang="ts">
import { computed, inject } from 'vue'

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

const orderedCoreSkills = computed(() =>
	skillList.reduce<SkillsOrdered>((acc, item) => {
		const core = item.toLocaleLowerCase() as SkillsList

		if (curriculum.value.CoreSkills.skills[core]) {
			acc[core] = curriculum.value.CoreSkills.skills[core].join(', ')
		}

		return acc
	}, {})
)

function saveSkill(core: SkillsList, val: string) {
	if (val === '') {
		delete curriculum.value.CoreSkills.skills[core]
	} else {
		curriculum.value.CoreSkills.skills[core] = val.split(' ,')
	}
}
</script>

<template>
	<ul>
		<li v-for="(skill, core) in orderedCoreSkills" :key="core">
			<div v-if="orderedCoreSkills[core]">
				<span :style="{ fontSize: `var(${fontSize})` }" class="core"
					>{{ Translate[core][language] }}:
				</span>
				<span :style="{ fontSize: `var(${fontSize})` }" v-if="!readonly">
					<AppInput
						cv-input
						v-model="orderedCoreSkills[core]"
						@update:model-value="(val) => saveSkill(core, val)"
					/>
				</span>
				<span v-else-if="boldMatches" :style="{ fontSize: `var(${fontSize})` }">
					<AppBoldMatch :value="boldMatches(orderedCoreSkills[core])" />
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
