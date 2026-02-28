<script setup lang="ts">
import type { Skills, FontSize } from '@/types'

type Props =
	| {
			genericList: Array<string>
			coreSkills?: Skills
			boldMatches?: (v: string) => string
			fontSize?: FontSize
	  }
	| {
			genericList?: Array<string>
			coreSkills: Skills
			boldMatches?: (v: string) => string
			fontSize?: FontSize
	  }

const { genericList, coreSkills, boldMatches, fontSize } = defineProps<Props>()
</script>

<template>
	<ul>
		<template v-if="genericList">
			<li v-for="item in genericList">
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
			<li v-for="(skill, core) in coreSkills">
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
	padding-left: 15px;
	li {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight);
		margin-bottom: 5px;
		color: var(--light-text-color);

		.core {
			text-transform: capitalize;
		}
	}
}
</style>
