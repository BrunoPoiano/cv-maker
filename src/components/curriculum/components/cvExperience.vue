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

	return `${Translate['remote'][curriculum.value.Settings.language]}`
}
</script>

<template>
	<div v-if="curriculum.Experience.show">
		<Title :fontsize="curriculum.Settings.section.size">{{
			Translate['professional experience'][curriculum.Settings.language]
		}}</Title>
		<div class="experience">
			<div v-for="job in curriculum.Experience.value" :key="job.id">
				<div
					:data-side-by-side="curriculum.Experience.sideBySide"
					class="job-title"
				>
					<span
						class="title"
						:style="{ fontSize: `var(${curriculum.Experience.size.title})` }"
					>
						{{ generateTitle(job) }}
					</span>
					<span
						class="sub-title"
						:style="{
							fontSize: `var(${curriculum.Experience.sideBySide ? curriculum.Experience.size.title : curriculum.Experience.size.subTitle})`
						}"
					>
						<span>
							{{
								generateDate(
									job,
									curriculum.Settings.language,
									curriculum.Experience.dateMonth
								)
							}}
						</span>
						<span v-if="job.Remote">|</span>
						<span v-if="job.Remote">
							{{ isRemote(job) }}
						</span>
					</span>
				</div>
				<List
					:genericList="job.Description"
					v-if="Array.isArray(job.Description)"
					:boldMatches="boldMatches"
					:fontSize="curriculum.Experience.size.description"
					:language="curriculum.Settings.language"
				/>
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
	gap: calc((var(--_a4-gap) * 0.8));

	.job-title {
		margin-bottom: calc((var(--_a4-gap) * 0.4));
		letter-spacing: 0.06em;

		.title,
		.sub-title {
			color: light-dark(#000, #fff);
			display: block;
			text-transform: capitalize;
			font-size: var(--font-size-base);
			font-weight: var(--font-weight);

			text-box-trim: trim-end;
			text-box-edge: cap alphabetic;
		}

		.title {
			margin-bottom: calc((var(--_a4-gap) * 0.5));
		}

		.sub-title {
			color: var(--light-text-color);
			display: flex;
			gap: 0.5ch;

			> span {
				text-box-trim: trim-both;
				text-box-edge: cap alphabetic;
			}
		}

		&[data-side-by-side='true'] {
			display: flex;
			align-items: center;
			justify-content: space-between;

			> .title {
				margin-bottom: 0;
			}

			> .sub-title {
				flex-direction: row-reverse;
			}
		}
	}
}
</style>
