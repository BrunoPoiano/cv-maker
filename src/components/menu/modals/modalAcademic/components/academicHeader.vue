<script setup lang="ts">
import { inject } from 'vue'

import { ProviderKey } from '@/keys'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { ProfilesStore } from '@/stores/profileStore'
import SvgNewDocument from '@/svgs/svgNewDocument.vue'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import AppPopover from '@/ui/appPopover.vue'

const { curriculum } = inject(ProviderKey)!
const curriculumIndex = CurriculumIndexStore.get()
</script>

<template>
	<div class="modalHeader">
		<h3>
			<AppInput
				type="checkbox"
				label="Academic Background"
				v-model="curriculum.AcademicBackground.show"
			/>
		</h3>
		<AppPopover>
			<AppButton
				icon-button
				@click="ProfilesStore.newAcademicSkill(curriculumIndex)"
			>
				<SvgNewDocument />
			</AppButton>
			<template #popover>New Academic Background</template>
		</AppPopover>
	</div>
</template>
<style scoped>
@layer utilities {
	.modalHeader {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		gap: 0.8rem;

		h3 {
			display: grid;
		}

		:has(button) {
			place-self: end;
			align-self: start;
		}
	}
}
</style>
