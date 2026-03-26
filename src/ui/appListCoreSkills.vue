<script setup lang="ts">
import { inject } from 'vue'

import { Translate } from '@/constants/translations'
import { ProviderSkillKey } from '@/keys'
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

const { skillsProxy } = inject(ProviderSkillKey)!
const { boldMatches, fontSize, readonly } = defineProps<Props>()

function onInput(core: SkillsList, value?: string) {
	skillsProxy.value = {
		...skillsProxy.value,
		[core]: value
	}
}

function orderedSkills(core: SkillsList) {
	if (skillsProxy.value[core] !== '') {
		return true
	}

	return false
}
</script>

<template>
	<ul>
		<template v-if="readonly">
			<template v-for="(_, core) in skillsProxy" :key="core">
				<li v-if="boldMatches && orderedSkills(core)">
					<div>
						<span :style="{ fontSize: `var(${fontSize})` }" class="core">
							{{ Translate[core as keyof SkillsOrdered][language] }}:
						</span>

						<span :style="{ fontSize: `var(${fontSize})` }">
							<AppBoldMatch :value="boldMatches(skillsProxy[core])" />
						</span>
					</div>
				</li>
			</template>
		</template>
		<template v-else>
			<li v-for="(_, core) in skillsProxy" :key="core">
				<div>
					<span :style="{ fontSize: `var(${fontSize})` }" class="core">
						{{ Translate[core as keyof SkillsOrdered][language] }}:
					</span>
					<span :style="{ fontSize: `var(${fontSize})` }">
						<AppInput
							cv-input
							v-model="skillsProxy[core]"
							@update:modelValue="onInput(core, $event)"
						/>
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
