<script setup lang="ts">
import { computed, inject } from 'vue'

import { Translate } from '@/constants/translations'
import { ProviderKey } from '@/keys'
import SvgPen from '@/svgs/SvgPen.vue'
import type { BoldMatchReturn } from '@/types'
import AppAnchor from '@/ui/appAnchor.vue'
import AppBoldMatch from '@/ui/appBoldMatch.vue'
import AppButton from '@/ui/appButton.vue'
import List from '@/ui/appList.vue'
import Paragraph from '@/ui/appParagraph.vue'
import AppTextarea from '@/ui/appTextarea.vue'

import ExDescription from '../../cvMenu/modals/experience/components/exDescription.vue'
import Title from './cvTitle.vue'

const { curriculum, readonly } = inject(ProviderKey)!

const { boldMatches } = defineProps<{
	boldMatches: (value: string) => BoldMatchReturn
}>()

const rows = computed(() =>
	Array.isArray(curriculum.value.Summary.value)
		? curriculum.value.Summary.value.length
		: curriculum.value.Summary.value.split('\n').length
)
</script>

<template>
	<div v-if="curriculum.Summary.show">
		<AppAnchor>
			<Title :fontsize="curriculum.Settings.section.size"
				>{{ Translate['summary'][curriculum.Settings.language] }}
			</Title>
			<div class="summary">
				<template v-if="readonly">
					<Paragraph
						v-if="curriculum.Summary.smallText !== ''"
						:fontSize="curriculum.Summary.size"
					>
						{{ curriculum.Summary.smallText }}
					</Paragraph>
					<List
						v-if="Array.isArray(curriculum.Summary.value)"
						:fontSize="curriculum.Summary.size"
						:genericList="curriculum.Summary.value"
						:boldMatches="boldMatches"
						:language="curriculum.Settings.language"
					/>
					<Paragraph v-else :fontSize="curriculum.Summary.size">
						<AppBoldMatch :value="boldMatches(curriculum.Summary.value)" />
					</Paragraph>
				</template>
				<template v-else>
					<Paragraph :fontSize="curriculum.Summary.size">
						<AppTextarea
							cvTextArea
							v-model="curriculum.Summary.smallText"
							:rows="curriculum.Summary.smallText.split('\n').length"
						/>
					</Paragraph>

					<span
						:style="{
							fontSize: `var(${curriculum.Summary.size})`,
							color: `var(--on-surface-variant)`
						}"
					>
						<ExDescription
							cvTextArea
							:rows="rows"
							:list="Array.isArray(curriculum.Summary.value)"
							v-model="curriculum.Summary.value"
						/>
					</span>
				</template>
			</div>
			<template #button>
				<AppButton icon-button modal id="modalCvSummary">
					<SvgPen />
				</AppButton>
			</template>
		</AppAnchor>
	</div>
</template>

<style>
.summary {
	display: grid;
	gap: calc((var(--_a4-gap) * 0.4));

	p:nth-child(1) {
		margin-top: calc(((var(--_a4-gap) * 0.2) * -1));

		text-box-trim: trim-end;
		text-box-edge: cap alphabetic;
	}
}
</style>
