<script setup lang="ts">
import type { BoldMatchReturn, FontSize, Languages } from '@/types'

import AppBoldMatch from './appBoldMatch.vue'

type Props = {
	genericList: Array<string>
	language: Languages
	boldMatches?: (v: string) => BoldMatchReturn
	fontSize?: FontSize
}

const { genericList, boldMatches, fontSize } = defineProps<Props>()
</script>

<template>
	<ul>
		<li v-for="(item, index) in genericList" :key="index">
			<span :style="{ fontSize: `var(${fontSize})` }" v-if="boldMatches">
				<AppBoldMatch :value="boldMatches(item)" />
			</span>
			<span :style="{ fontSize: `var(${fontSize})` }" v-else>
				{{ item }}
			</span>
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
		color: var(--on-surface-variant);

		.core {
			text-transform: capitalize;
		}
	}
}
</style>
