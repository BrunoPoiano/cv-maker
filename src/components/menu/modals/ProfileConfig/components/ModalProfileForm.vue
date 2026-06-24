<script setup lang="ts">
import { ref } from 'vue'

import { ProfilesStore } from '@/stores/profileStore'
import SvgCheck from '@/svgs/svgCheck.vue'
import SvgNewDocument from '@/svgs/svgNewDocument.vue'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import AppModal from '@/ui/appModal.vue'

type Props = {
	id: string
	index?: number
}

const props = defineProps<Props>()
const name = ref('')

function confirmForm() {
	if (!name.value.trim()) {
		return
	}

	switch (props.id) {
		case 'modalProfileForm':
			ProfilesStore.add(name.value)
			break
		case `modalProfileFormEdit${props.index}`: {
			if (props.index !== undefined) {
				ProfilesStore.update(props.index, name.value)
			}
		}
	}

	name.value = ''
}

function checkName() {
	if (props.id.includes('modalProfileFormEdit') && props.index !== undefined) {
		const profile = ProfilesStore.get().value[props.index]

		if (profile) {
			name.value = profile.name
		}
	}
}
</script>

<template>
	<AppModal :openAction="checkName" :id="props.id" closeLabel="close">
		<template #header>
			<div class="header">
				<h3>
					{{ props.id.includes('modalProfileFormEdit') ? 'Edit' : 'New' }}
					Profile
				</h3>
			</div>
		</template>
		<form @submit.prevent="confirmForm">
			<AppInput placeholder="Profile Name" v-model="name" />
			<AppButton iconButton @click="confirmForm" :disabled="!name.trim()">
				<SvgCheck v-if="props.id.includes('modalProfileFormEdit')" />
				<SvgNewDocument v-else />
			</AppButton>
		</form>
	</AppModal>
</template>

<style scoped>
@layer utilities {
	form {
		display: flex;
		gap: 1rem;
		align-items: center;
	}
}
</style>
