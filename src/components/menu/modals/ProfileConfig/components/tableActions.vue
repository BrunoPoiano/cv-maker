<script setup lang="ts">
import { ProfileIndexStore } from '@/stores/profileIndexStore'
import { ProfilesStore } from '@/stores/profileStore'
import AppButton from '@/ui/appButton.vue'

import ModalProfileForm from './ModalProfileForm.vue'

type Props = {
	index: number
}

const props = defineProps<Props>()
const modalEditId = `modalProfileFormEdit${props.index}`
const currentlyProfile = ProfileIndexStore.get()
</script>
<template>
	<AppButton
		:disabled="props.index === 0 || props.index === currentlyProfile"
		@click="ProfilesStore.delete(props.index)"
	>
		Delete
	</AppButton>
	<AppButton modal :id="modalEditId"> edit </AppButton>
	<ModalProfileForm :id="modalEditId" :index="props.index" />
</template>
