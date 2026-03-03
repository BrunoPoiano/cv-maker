<script setup lang="ts">
import type { FontSize, Skills } from '@/types'

type Props =
	| {
			genericList: Array<string>
			coreSkills?: Skills
			boldMatches?: (v: string) => string
			fontSize?: FontSize
	  }
	| {
			coreSkills: Skills
			genericList?: Array<string>
			boldMatches?: (v: string) => string
			fontSize?: FontSize
	  }

const { genericList, coreSkills, boldMatches, fontSize } = defineProps<Props>()
</script>

<template>
	<ul>
		<template v-if="genericList">
			<li v-for="(item,index) in genericList" :key="index">
				<span
					:style="`font-size: var(${fontSize})`"
					v-if="boldMatches"
					v-html="boldMatches(item)"
				/>
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
					<span
						:style="`font-size: var(${fontSize})`"
						v-if="boldMatches"
						v-html="boldMatches(skill.join(', '))"
					/>
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
