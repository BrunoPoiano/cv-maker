<script setup lang="ts">
import type { CoreSkills } from '@/types'

type Props =
	| {
			genericList: Array<string>
			coreSkills?: CoreSkills
	  }
	| {
			genericList?: Array<string>
			coreSkills: CoreSkills
	  }

const { genericList, coreSkills } = defineProps<Props>()
</script>

<template>
	<ul>
		<template v-if="genericList">
			<li v-for="item in genericList">
				{{ item }}
			</li>
		</template>
		<template v-if="coreSkills">
			<li v-for="(skill, core) in coreSkills">
				<div v-if="skill">
					<span class="core">{{ core.replace('_', ' & ') }}: </span>
					<span>
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
