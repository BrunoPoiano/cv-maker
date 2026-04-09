<script setup lang="ts">
import { inject } from 'vue'

import { Translate } from '@/constants/translations'
import { ProviderKey } from '@/keys'
import { bolderStore } from '@/stores/bolderStore'
import SvgPen from '@/svgs/SvgPen.vue'
import AppAnchor from '@/ui/appAnchor.vue'
import AppButton from '@/ui/appButton.vue'
import AppListCoreSkills from '@/ui/appListCoreSkills.vue'

import Title from './cvTitle.vue'

const { curriculum, readonly } = inject(ProviderKey)!
</script>

<template>
	<div v-if="curriculum.CoreSkills.show">
		<AppAnchor>
			<Title :fontsize="curriculum.Settings.section.size">{{
				Translate['core skills'][curriculum.Settings.language]
			}}</Title>
			<div class="coreSkills">
				<AppListCoreSkills
					:readonly="readonly"
					:fontSize="curriculum.CoreSkills.size"
					:boldMatches="bolderStore.matches"
					:language="curriculum.Settings.language"
				/>
			</div>
			<template #button>
				<AppButton icon-button modal id="modalCvCoreSkills">
					<SvgPen />
				</AppButton>
			</template>
		</AppAnchor>
	</div>
</template>
