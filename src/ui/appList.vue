<script setup lang="ts">
import type {
	BoldMatchReturn,
	FontSize,
	Languages,
	Skills,
	SkillsList
} from '@/types'
import AppBoldMatch from './appBoldMatch.vue'
import { Translate } from '@/constants/translations'
import { computed } from 'vue'
import { skillList } from '@/constants/skillList'

type Props =
	| {
			genericList: Array<string>
			language: Languages
			coreSkills?: Skills
			boldMatches?: (v: string) => BoldMatchReturn
			fontSize?: FontSize
	  }
	| {
			coreSkills: Skills
			language: Languages
			genericList?: Array<string>
			boldMatches?: (v: string) => BoldMatchReturn
			fontSize?: FontSize
	  }

const { genericList, coreSkills, boldMatches, fontSize } = defineProps<Props>()

const orderedCoreSkills = computed(() => {
	const ordered: Skills = {}

	if (!coreSkills) return ordered

	for (const key of skillList) {
		const core = key.toLocaleLowerCase() as SkillsList

		if (coreSkills[core]) {
			ordered[core] = coreSkills[core]
		}
	}

	return ordered
})
</script>

<template>
	<ul>
		<template v-if="genericList">
			<li v-for="(item, index) in genericList" :key="index">
				<span :style="`font-size: var(${fontSize})`" v-if="boldMatches">
					<AppBoldMatch :value="boldMatches(item)" />
				</span>
				<span :style="`font-size: var(${fontSize})`" v-else>
					{{ item }}
				</span>
			</li>
		</template>
		<template v-if="coreSkills">
			<li v-for="(skill, core) in orderedCoreSkills" :key="core">
				<div v-if="skill">
					<span :style="`font-size: var(${fontSize})`" class="core"
						>{{ Translate[core][language] }}:
					</span>
					<span :style="`font-size: var(${fontSize})`" v-if="boldMatches">
						<AppBoldMatch :value="boldMatches(skill.join(', '))" />
					</span>
					<span :style="`font-size: var(${fontSize})`" v-else>
						{{ skill.join(', ') }}
					</span>
				</div>
			</li>
		</template>
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

		.core {
			text-transform: capitalize;
		}
	}
}
</style>
