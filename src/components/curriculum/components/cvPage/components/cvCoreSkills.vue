<script setup lang="ts">
import { inject } from 'vue'

import { Translate } from '@/constants/translations'
import { ProviderKey } from '@/keys'
import SvgPen from '@/svgs/SvgPen.vue'
import type { BoldMatchReturn } from '@/types'
import AppAnchor from '@/ui/appAnchor.vue'
import AppButton from '@/ui/appButton.vue'
import AppListCoreSkills from '@/ui/appListCoreSkills.vue'

import Title from './cvTitle.vue'

const { curriculum } = inject(ProviderKey)!
const { boldMatches } = defineProps<{
	boldMatches: (value: string) => BoldMatchReturn
}>()
</script>

<template>
	<div v-if="curriculum.CoreSkills.show">
		<AppAnchor>
			<Title :fontsize="curriculum.Settings.section.size">{{
				Translate['core skills'][curriculum.Settings.language]
			}}</Title>
			<div class="coreSkills">
				<AppListCoreSkills
					:fontSize="curriculum.CoreSkills.size"
					:boldMatches="boldMatches"
					:language="curriculum.Settings.language"
				/>
			</div>
			<template #button>
				<AppButton modal id="modalCvCoreSkills">
					<SvgPen />
				</AppButton>
			</template>
		</AppAnchor>
	</div>
</template>
