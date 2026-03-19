<script setup lang="ts">
import { inject } from 'vue'

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

import Title from './cvTitle.vue'

const { curriculum } = inject(ProviderKey)!

const { boldMatches } = defineProps<{
	boldMatches: (value: string) => BoldMatchReturn
}>()
</script>

<template>
	<div v-if="curriculum.Summary.show">
		<AppAnchor>
			<Title :fontsize="curriculum.Settings.section.size"
				>{{ Translate['summary'][curriculum.Settings.language] }}
			</Title>
			<div class="summary">
				<Paragraph
					v-if="curriculum.Summary.smallText !== ''"
					:fontSize="curriculum.Summary.size"
				>
					<AppTextarea
						cvTextArea
						v-model="curriculum.Summary.smallText"
						:rows="curriculum.Summary.smallText.split('\n').length"
					/>
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
			</div>
			<template #button>
				<AppButton modal id="modalCvSummary">
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
