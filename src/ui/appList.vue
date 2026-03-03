<script setup lang="ts">
import type { BoldMatchReturn, FontSize, Skills } from '@/types'
import AppBoldMatch from './appBoldMatch.vue'

type Props =
	| {
			genericList: Array<string>
			coreSkills?: Skills
			boldMatches?: (v: string) => BoldMatchReturn
			fontSize?: FontSize
	  }
	| {
			coreSkills: Skills
			genericList?: Array<string>
			boldMatches?: (v: string) => BoldMatchReturn
			fontSize?: FontSize
	  }

const { genericList, coreSkills, boldMatches, fontSize } = defineProps<Props>()
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
			<li v-for="(skill, core) in coreSkills" :key="core">
				<div v-if="skill">
					<span :style="`font-size: var(${fontSize})`" class="core"
						>{{ core.replace('_', ' & ') }}:
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
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight);
		color: var(--light-text-color);

		.core {
			text-transform: capitalize;
		}
	}
}
</style>
