<script setup lang="ts">
import { inject } from 'vue'

import { fontSizeSelect } from '@/constants/font-size'
import { textAlignSelect } from '@/constants/text-align'
import { ProviderKey } from '@/keys'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { ProfilesStore } from '@/stores/profileStore'
import SvgDefault from '@/svgs/SvgDefault.vue'
import AppButton from '@/ui/appButton.vue'
import AppPopover from '@/ui/appPopover.vue'
import AppSelect from '@/ui/appSelect.vue'

const { curriculum } = inject(ProviderKey)!
const curriculumIndex = CurriculumIndexStore.get()
</script>

<template>
	<div class="settings">
		<AppSelect
			label="Text Align"
			:items="textAlignSelect"
			v-model="curriculum.Contact.align"
		/>

		<AppSelect
			fullWidth
			label="Font Size"
			:items="fontSizeSelect"
			v-model="curriculum.Contact.size"
			fitContent
		/>
		<AppPopover>
			<AppButton
				icon-button
				@click="ProfilesStore.setContactDefaultValue(curriculumIndex)"
			>
				<SvgDefault />
			</AppButton>
			<template #popover>Set default values</template>
		</AppPopover>
	</div>
</template>

<style scoped>
@layer utilities {
	.settings {
		display: grid;
		gap: 1rem;
		grid-template-columns: 10ch 10ch 1fr;
		align-items: end;

		:has(button) {
			justify-self: end;
		}
	}
}
</style>
