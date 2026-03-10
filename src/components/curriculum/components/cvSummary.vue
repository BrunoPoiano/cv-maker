<script setup lang="ts">
import { ProviderKey } from '@/keys'
import type { BoldMatchReturn } from '@/types'
import AppBoldMatch from '@/ui/appBoldMatch.vue'
import List from '@/ui/appList.vue'
import Paragraph from '@/ui/appParagraph.vue'
import { inject } from 'vue'
import Title from './cvTitle.vue'
import { Translate } from '@/constants/translations'

const { curriculum } = inject(ProviderKey)!

const { boldMatches } = defineProps<{
	boldMatches: (value: string) => BoldMatchReturn
}>()
</script>

<template>
	<div v-if="curriculum.Summary.show">
		<Title :fontsize="curriculum.Settings.section.size">{{ Translate['summary'][curriculum.Settings.language] }}
		</Title>
		<div class="summary">
			<Paragraph v-if="curriculum.Summary.smallText !== ''" :fontSize="curriculum.Summary.size">
				{{ curriculum.Summary.smallText }}
			</Paragraph>
			<List v-if="Array.isArray(curriculum.Summary.value)" :fontSize="curriculum.Summary.size"
				:genericList="curriculum.Summary.value" :boldMatches="boldMatches"
				:language="curriculum.Settings.language" />
			<Paragraph v-else :fontSize="curriculum.Summary.size">
				<AppBoldMatch :value="boldMatches(curriculum.Summary.value)" />
			</Paragraph>
		</div>
	</div>
</template>

<style>
.summary {
	display: grid;
	gap: calc((var(--_a4-gap) * 0.4));

	p:nth-child(1) {
		margin-top: calc(((var(--_a4-gap) * 0.2) * -1));
	}
}
</style>
