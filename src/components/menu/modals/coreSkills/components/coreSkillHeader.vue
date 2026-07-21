<script setup lang="ts">
import { inject } from 'vue'

import { ProviderKey } from '@/keys'
import SvgNewDocument from '@/svgs/svgNewDocument.vue'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import AppPopover from '@/ui/appPopover.vue'
import AppSmall from '@/ui/appSmall.vue'

type Props = {
	id: string
}

const props = defineProps<Props>()
const { curriculum } = inject(ProviderKey)!
</script>

<template>
	<div class="header">
		<h3>
			<AppInput
				type="checkbox"
				label="Core Skills"
				v-model="curriculum.CoreSkills.show"
			/>
			<AppSmall>Items will be separeted by commas (,)</AppSmall>
		</h3>
		<AppPopover>
			<AppButton modal icon-button :id="props.id">
				<SvgNewDocument />
			</AppButton>
			<template #popover> New Core Skill </template>
		</AppPopover>
	</div>
</template>
