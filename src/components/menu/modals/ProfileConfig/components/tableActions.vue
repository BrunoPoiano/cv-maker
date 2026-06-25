<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import { ProfileIndexStore } from '@/stores/profileIndexStore'
import { ProfilesStore } from '@/stores/profileStore'
import SvgPen from '@/svgs/SvgPen.vue'
import SvgTrash from '@/svgs/svgTrash.vue'
import AppButton from '@/ui/appButton.vue'
import AppPopover from '@/ui/appPopover.vue'

const ModalProfileForm = defineAsyncComponent(
	() => import('./ModalProfileForm.vue')
)

type Props = {
	index: number
}

const props = defineProps<Props>()
const modalEditId = `modalProfileFormEdit${props.index}`
const currentlyProfile = ProfileIndexStore.get()
</script>
<template>
	<div class="actions">
		<AppPopover color="var(--red)" nowrap>
			<AppButton
				iconButton
				hoverBackground="var(--red)"
				:disabled="props.index === 0 || props.index === currentlyProfile"
				@click="ProfilesStore.delete(props.index)"
			>
				<SvgTrash />
			</AppButton>
			<template #popover>
				{{
					props.index === 0
						? 'First profile cannot be deleted'
						: props.index === currentlyProfile
							? 'Selected profile cannot be deleted'
							: 'This action cannot be undone'
				}}
			</template>
		</AppPopover>
		<AppPopover>
			<AppButton iconButton modal :id="modalEditId"> <SvgPen /> </AppButton>
			<template #popover> Edit Profile </template>
		</AppPopover>
		<ModalProfileForm :id="modalEditId" :index="props.index" />
	</div>
</template>
<style scoped>
@layer utilities {
	.actions {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
}
</style>
