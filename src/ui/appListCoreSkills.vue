<script setup lang="ts">
import { computed, inject } from 'vue'

import { Translate } from '@/constants/translations'
import { ProviderSkillKey } from '@/keys'
import type { BoldMatchReturn, FontSize, Languages } from '@/types'

import AppBoldMatch from './appBoldMatch.vue'
import AppInput from './appInput.vue'

type Props = {
	language: Languages
	sideBySide?: boolean
	boldMatches?: (v: string) => BoldMatchReturn
	fontSize?: FontSize
	readonly?: boolean
}

const { skillsProxy, onInput } = inject(ProviderSkillKey)!
const { boldMatches, fontSize, readonly, language } = defineProps<Props>()

function orderedSkills(core: string) {
	if (skillsProxy.value[core] !== '') {
		return true
	}

	return false
}

function translateCore(core: string) {
	if (core in Translate) {
		return Translate[core as keyof typeof Translate][language]
	}
	return core
}

const skillsList = computed(() =>
	Object.values(skillsProxy.value)
		.filter((item) => item !== '')
		.join(', ')
)
</script>

<template>
	<template v-if="readonly">
		<ul v-if="!sideBySide">
			<template v-for="(_, core) in skillsProxy" :key="core">
				<li v-if="boldMatches && orderedSkills(core)">
					<div>
						<span :style="{ fontSize: `var(${fontSize})` }" class="core">
							{{ translateCore(core) }}:
						</span>

						<span
							:style="{ fontSize: `var(${fontSize})` }"
							v-if="skillsProxy[core]"
						>
							<AppBoldMatch :value="boldMatches(skillsProxy[core])" />
						</span>
					</div>
				</li>
			</template>
		</ul>
		<div :style="{ marginTop: '-0.5rem' }" v-else>
			<template v-if="boldMatches">
				<span
					:style="{
						fontSize: `var(${fontSize})`,
						color: 'var(--on-surface-variant)'
					}"
				>
					<AppBoldMatch :value="boldMatches(skillsList)" />
				</span>
			</template>
		</div>
	</template>
	<template v-else>
		<ul>
			<li v-for="(_, core) in skillsProxy" :key="core">
				<div>
					<span :style="{ fontSize: `var(${fontSize})` }" class="core">
						{{ translateCore(core) }}:
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
		</ul>
	</template>
</template>

<style scoped>
@layer components {
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
}
</style>
