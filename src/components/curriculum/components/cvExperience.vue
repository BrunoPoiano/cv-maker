<script setup lang="ts">
import { ProviderKey } from '@/keys'
import type { BoldMatchReturn, Curriculum } from '@/types'
import AppBoldMatch from '@/ui/appBoldMatch.vue'
import List from '@/ui/appList.vue'
import Paragraph from '@/ui/appParagraph.vue'
import { inject } from 'vue'
import Title from './cvTitle.vue'
import { Translate } from '@/constants/translations'
import { generateDate, generateTitle } from '@/helpers/cvFormatters'

const { boldMatches } = defineProps<{
	boldMatches: (value: string) => BoldMatchReturn
}>()

const { curriculum } = inject(ProviderKey)!

function isRemote(job: Curriculum['Experience']['value'][number]) {
	if (!job.Remote) return ''

	return ` | ${Translate['remote'][curriculum.value.Settings.language]}`
}


</script>

<template>
	<div v-if="curriculum.Experience.show">
		<Title>{{
			Translate['professional experience'][curriculum.Settings.language]
		}}</Title>
		<div class="experience">
			<div v-for="job in curriculum.Experience.value" :key="job.id">
				<span class="title" :style="`font-size: var(${curriculum.Experience.size.title})`">
					{{ generateTitle(job) }}
				</span>
				<span class="sub-title" :style="`font-size: var(${curriculum.Experience.size.subTitle})`">,
					{{ generateDate(job, curriculum.Settings.language, curriculum.Experience.dateMonth) }} {{
						isRemote(job) }}
				</span>
				<List :genericList="job.Description" v-if="Array.isArray(job.Description)" :boldMatches="boldMatches"
					:fontSize="curriculum.Experience.size.description" :language="curriculum.Settings.language" />
				<Paragraph v-else :fontSize="curriculum.Experience.size.description">
					<AppBoldMatch :value="boldMatches(job.Description)" />
				</Paragraph>
			</div>
		</div>
	</div>
</template>

<style scoped>
.experience {
	display: grid;
	gap: calc((var(--_a4-gap) * 0.5));

	.title,
	.sub-title {
		display: block;
		color: black;
		text-transform: capitalize;
		font-size: var(--font-size-base);
		font-weight: var(--font-weight);
		margin-bottom: calc((var(--_a4-gap) * 0.2));
	}

	.sub-title {
		color: var(--light-text-color);
	}
}
</style>
