<script setup lang="ts">
import { inject } from 'vue'

import { Translate } from '@/constants/translations'
import { generateDate, generateTitle } from '@/helpers/cvFormatters'
import { ProviderKey } from '@/keys'
import SvgPen from '@/svgs/SvgPen.vue'
import type { BoldMatchReturn, Curriculum } from '@/types'
import AppAnchor from '@/ui/appAnchor.vue'
import AppBoldMatch from '@/ui/appBoldMatch.vue'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import List from '@/ui/appList.vue'
import Paragraph from '@/ui/appParagraph.vue'

import ExDateInput from '../../cvMenu/modals/experience/components/exDateInput.vue'
import ExDescription from '../../cvMenu/modals/experience/components/exDescription.vue'
import Title from './cvTitle.vue'

const { boldMatches } = defineProps<{
	boldMatches: (value: string) => BoldMatchReturn
}>()

const { curriculum, readonly } = inject(ProviderKey)!

function isRemote(job: Curriculum['Experience']['value'][number]) {
	if (!job.Remote) return ''

	return `${Translate['remote'][curriculum.value.Settings.language]}`
}
</script>

<template>
	<div v-if="curriculum.Experience.show">
		<AppAnchor>
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
							<template v-if="readonly">
								{{ generateTitle(job) }}
							</template>
							<div class="inputs" v-else>
								<AppInput v-model="job.Role" cv-input placeholder="Role" />
								<AppInput
									v-model="job.CompanyName"
									cv-input
									placeholder="Company Name"
								/>
							</div>
						</span>
						<span
							class="sub-title"
							:style="{
								fontSize: `var(${curriculum.Experience.sideBySide ? curriculum.Experience.size.title : curriculum.Experience.size.subTitle})`
							}"
						>
							<template v-if="!readonly">
								<div class="date">
									<ExDateInput
										data-cvInput
										type="date"
										placeholder="Start Date"
										v-model="job.StartDate"
									/>
									<ExDateInput
										data-cvInput
										type="date"
										placeholder="EndDate"
										v-model="job.EndDate"
									/>
								</div>
							</template>

							<span v-else>
								{{
									generateDate(
										job,
										curriculum.Settings.language,
										curriculum.Experience.dateMonth
									)
								}}
							</span>
							<template v-if="!readonly">
								<span>|</span>
								<AppInput type="checkbox" label="Remote" v-model="job.Remote" />
							</template>
							<template v-else>
								<template v-if="job.Remote">
									<span>|</span>
									<span>
										{{ isRemote(job) }}
									</span>
								</template>
							</template>
						</span>
					</div>
					<template v-if="!readonly">
						<span
							:style="{
								fontSize: `var(${curriculum.Experience.size.description})`,
								color: `var(--light-text-color)`
							}"
						>
							<ExDescription
								cvTextArea
								:rows="
									Array.isArray(curriculum.Summary.value)
										? curriculum.Summary.value.length
										: curriculum.Summary.smallText.split('\n').length
								"
								:list="Array.isArray(job.Description)"
								v-model="job.Description"
							/>
						</span>
					</template>
					<template v-else>
						<List
							:genericList="job.Description"
							v-if="Array.isArray(job.Description)"
							:boldMatches="boldMatches"
							:fontSize="curriculum.Experience.size.description"
							:language="curriculum.Settings.language"
						/>
						<Paragraph
							v-else
							:fontSize="curriculum.Experience.size.description"
						>
							<AppBoldMatch :value="boldMatches(job.Description)" />
						</Paragraph>
					</template>
				</div>
			</div>
			<template #button>
				<AppButton modal id="modalCvExperience">
					<SvgPen />
				</AppButton>
			</template>
		</AppAnchor>
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

			.inputs {
				display: grid;
				grid-template-columns: auto 1fr;
				gap: 1ch;
			}
		}

		.sub-title {
			color: var(--light-text-color);
			display: flex;
			align-items: center;
			gap: 0.5ch;

			> span {
				text-box-trim: trim-both;
				text-box-edge: cap alphabetic;
			}

			.date {
				display: grid;
				grid-template-columns: auto 1fr;
				gap: 1ch;
			}
		}

		&[data-side-by-side='true'] {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;

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
